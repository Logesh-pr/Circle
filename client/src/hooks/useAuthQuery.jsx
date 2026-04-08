import { useMutation, useQuery } from "@tanstack/react-query";
import {
  signup,
  resendOTP,
  signupStatus,
  verifyOTP,
  setUsername,
} from "../api/axios";

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};

export const useSignupStatus = () => {
  return useQuery({
    queryKey: ["signupStatus"],
    queryFn: signupStatus,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useResendOTP = () => {
  return useMutation({
    mutationFn: resendOTP,
  });
};

export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: verifyOTP,
  });
};

export const useSetUsername = () => {
  return useMutation({
    mutationFn: setUsername,
  });
};
