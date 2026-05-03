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
  // const userId = useAuthStore((state) => state.user?.id);
  // console.log("likeQuery", userId);

  return useMutation({
    mutationFn: likePost,

    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["post"] });

      const previousPosts = await queryClient.getQueryData(["post"]);

      queryClient.setQueryData(["post"], (old) =>
        old?.map((post) =>
          post._id === postId
            ? {
                ...post,
                likesCount: post.isLiked
                  ? post.likesCount - 1
                  : post.likesCount + 1,

                isLiked: !post.isLiked,
              }
            : post,
        ),
      );

      return { previousPosts };
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(["post"], context.previousPosts);
      console.log("Failed to like post");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
}
