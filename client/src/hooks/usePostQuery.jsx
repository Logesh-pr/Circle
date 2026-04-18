import { useMutation } from "@tanstack/react-query";

//axios
import CreatePost from "../components/ui/CreatePost";

export const useCreatePost = () => {
  useMutation({
    mutationFn: CreatePost,
  });
};
