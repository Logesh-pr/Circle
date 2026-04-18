import { useMutation, useQuery } from "@tanstack/react-query";

//axios
import { createPost, fetchPost } from "../api/axios";

export const useFetchAllPost = () => {
  return useQuery({
    queryKey: ["post"],
    queryFn: fetchPost,
  });
};

export const useCreatePost = () => {
  return useMutation({
    mutationFn: createPost,
  });
};
