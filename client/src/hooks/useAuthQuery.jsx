import { useMutation } from "@tanstack/react-query";
import { signup } from "../../api/axios";

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};
