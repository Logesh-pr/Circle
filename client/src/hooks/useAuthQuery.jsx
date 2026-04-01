import { useMutation } from "@tanstack/react-query";
import { signup, resendOTP } from "../api/axios";

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};

export const useResendOTP = () => {
  return useMutation({
    mutationFn: resendOTP,
  });
};
