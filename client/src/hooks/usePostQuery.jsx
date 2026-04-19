import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//axios
import { createPost, fetchPost } from "../api/axios";

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
