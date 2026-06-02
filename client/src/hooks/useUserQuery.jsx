import { useMutation, useQuery } from "@tanstack/react-query";

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
  return useMutation({
    mutationFn: (username) => followUser(username),
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
