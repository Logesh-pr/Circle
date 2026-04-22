import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//axios
import { createPost, fetchPost, likePost } from "../api/axios";

//zustand
import { useAuthStore } from "../store/useAuthStore";

export const useFetchAllPost = () => {
  return useQuery({
    queryKey: ["post"],
    queryFn: fetchPost,
    staleTime: 1 * 60 * 1000,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
};

export function useLikePost() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.user?.id);
  console.log("likeQuery", userId);

  return useMutation({
    mutationFn: likePost,

    // Fires BEFORE the API call
    onMutate: async (postId) => {
      // Cancel any in-flight refetches to avoid race conditions
      await queryClient.cancelQueries({ queryKey: ["post"] });

      // Snapshot the current data for rollback
      const previousPosts = queryClient.getQueryData(["post"]);

      // Optimistically update the cache
      queryClient.setQueryData(["post"], (old) =>
        old?.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: post.isLiked
                  ? post.likes.filter((id) => id !== userId)
                  : [...post.likes, userId],
                isLiked: !post.isLiked,
              }
            : post,
        ),
      );

      // Return snapshot so we can rollback in onError
      return { previousPosts };
    },

    onError: (err, variables, context) => {
      // Restore the snapshot
      queryClient.setQueryData(["post"], context.previousPosts);
      console.log("Failed to like post");
    },

    onSettled: () => {
      // Always refetch after mutation to sync with server truth
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
}
