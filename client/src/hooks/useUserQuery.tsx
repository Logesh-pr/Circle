import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//axios
import {
  fetchUserProfile,
  followUser,
  getUserFollowers,
  searchUsers,
} from "../api/axios";

export function useSearchQuery(query) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => searchUsers(query),
    enabled: query?.length > 1,
    // staleTime: 2 * 60 * 1000,
    placeholderData: (perv) => perv,
  });
}

export function useUserProfileQuery(username) {
  return useQuery({
    queryKey: ["userProfile", username],
    queryFn: () => fetchUserProfile(username),
    enabled: !!username,
    staleTime: 2 * 60 * 1000,
  });
}

export function useFollowUserQuery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (username) => followUser(username),

    onMutate: async (username) => {
      await queryClient.cancelQueries({ queryKey: ["userProfile", username] });

      const previousUserProfile = queryClient.setQueryData({
        queryKey: ["userProfile", username],
      });

      await queryClient.setQueryData({ queryKey: ["userProfile"] }, (old) => {
        if (!old) return old;

        const isNowFollowing = !old.isFollowing;
        return {
          ...old,
          isFollowing: isNowFollowing,
          followersCount: isNowFollowing
            ? (old.followersCount || 0) + 1
            : (old.followersCount || 0) - 1,
        };
      });

      return { previousUserProfile, username };
    },

    onError: (err, username, context) => {
      queryClient.setQueryData(
        ["userProfile", context.username],
        context.previousUserProfile,
      );
    },

    onSettled: (data, err, username) => {
      queryClient.invalidateQueries({ queryKey: ["userProfile", username] });
      queryClient.invalidateQueries({ queryKey: ["followers", username] });
      queryClient.invalidateQueries({ queryKey: ["followings", username] });
    },
  });
}

export function useGetFollowersQuery(username, type) {
  return useQuery({
    queryKey: ["followers", username],
    queryFn: () => getUserFollowers(username, type),
    refetchOnMount: "always",
  });
}

export function useGetFollowingsQuery(username, type) {
  return useQuery({
    queryKey: ["followings", username],
    queryFn: () => getUserFollowers(username, type),
    refetchOnMount: "always",
  });
}
