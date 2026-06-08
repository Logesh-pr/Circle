import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//axios
import {
  createPost,
  fetchPost,
  likePost,
  bookmarkPost,
  getAllBookmarks,
  commentPost,
  getAllComments,
  fetchPostByProfile,
} from "../api/axios";

//zustand
import { useAuthStore } from "../store/useAuthStore";

//libs
import updatePostInAllCaches from "../utils/updatePostInAllCaches";

//toast
import toast from "react-hot-toast";

export const useFetchAllPost = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPost,
    staleTime: 1 * 60 * 1000,
  });
};

export const useFetchAllPostByProfile = (username) => {
  return useQuery({
    queryKey: ["userPosts", username],
    queryFn: () => fetchPostByProfile(username),
    staleTime: 2 * 60 * 1000,
  });
};
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePost,

    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      await queryClient.cancelQueries({ queryKey: ["bookmarks"] });
      await queryClient.cancelQueries({ queryKey: ["userPosts"] });

      const previousPosts = queryClient.getQueryData(["posts"]);
      const previousBookmarks = queryClient.getQueryData(["bookmarks"]);
      const previousUserPosts = queryClient.getQueriesData({
        queryKey: ["userPosts"],
      });

      let wasLiked = false;

      updatePostInAllCaches(queryClient, postId, (post) => {
        wasLiked = post.isLiked;
        return {
          ...post,
          likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
          isLiked: !post.isLiked,
        };
      });

      return {
        previousPosts,
        previousBookmarks,
        previousUserPosts,
        wasLiked,
      };
    },

    onSuccess: (data, variables, context) => {
      if (!context.wasLiked) {
        toast.success("Post Liked");
      }
    },

    onError: (err, variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
      if (context?.previousBookmarks) {
        queryClient.setQueryData(["bookmarks"], context.previousBookmarks);
      }
      if (context?.previousUserPosts) {
        context.previousUserPosts.forEach(([key, data]) =>
          queryClient.setQueryData(key, data),
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
    },
  });
}

export function useBookmarkPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookmarkPost,

    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      await queryClient.cancelQueries({ queryKey: ["bookmarks"] });
      await queryClient.cancelQueries({ queryKey: ["userPosts"] });

      const previousPosts = queryClient.getQueryData(["posts"]);
      const previousBookmarks = queryClient.getQueryData(["bookmarks"]);
      const previousUserPosts = queryClient.getQueriesData({
        queryKey: ["userPosts"],
      });

      let wasBookmarked = false;

      updatePostInAllCaches(queryClient, postId, (post) => {
        wasBookmarked = post.isBookmarked;
        return {
          ...post,
          bookmarkCount: post.isBookmarked
            ? post.bookmarkCount - 1
            : post.bookmarkCount + 1,
          isBookmarked: !post.isBookmarked,
        };
      });

      return {
        previousPosts,
        previousBookmarks,
        previousUserPosts,
        wasBookmarked,
      };
    },

    onSuccess: (data, variables, context) => {
      toast.success(context.wasBookmarked ? "Bookmar removed" : "Bookmarked");
    },
    onError: (err, variables, context) => {
      if (context?.previousPosts)
        queryClient.setQueryData(["posts"], context.previousPosts);
      if (context?.previousBookmarks)
        queryClient.setQueryData(["bookmarks"], context.previousBookmarks);
      if (context?.previousUserPosts) {
        context.previousUserPosts.forEach(([key, data]) =>
          queryClient.setQueryData(key, data),
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
    },
  });
}

export function useGetAllBookmarks() {
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: getAllBookmarks,
  });
}

export function useCommentPost() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: ({ postId, comment }) => commentPost(postId, { comment }),

    onMutate: async ({ postId, comment }) => {
      await queryClient.cancelQueries({ queryKey: ["comments", postId] });
      const previousComments = queryClient.getQueryData(["comments", postId]);

      queryClient.setQueryData(["comments", postId], (old) => ({
        ...old,
        data: [
          ...(old?.data || []),
          {
            _id: Date.now(),
            user: { name: user.name, username: user.username },
            post: postId,
            content: comment,
            createdAt: new Date().toISOString(),
          },
        ],
      }));

      return { previousComments, postId };
    },

    onError: (err, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          ["comments", context.postId],
          context.previousComments,
        );
      }
    },

    onSettled: (data, err, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useGetAllComments(postId) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getAllComments(postId),
    enabled: !!postId,
  });
}
