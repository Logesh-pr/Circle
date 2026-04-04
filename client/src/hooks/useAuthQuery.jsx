import { useMutation, useQuery } from "@tanstack/react-query";
import { signup, resendOTP, checkOTPStatus } from "../api/axios";

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};

export const useCheckOTPStatus = () => {
  return useQuery({
    mutationKey: ["otp"],
    mutationFn: checkOTPStatus,
  });
};
export const useResendOTP = () => {
  return useMutation({
    mutationFn: resendOTP,
  });
};
