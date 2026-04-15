import { useMutation, useQuery } from "@tanstack/react-query";
import {
  signup,
  resendOTP,
  signupStatus,
  verifyOTP,
  setUsername,
  checkUsername,
  login,
  fetchMe,
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

export const useCheckUsername = () => {
  return useMutation({
    mutationFn: checkUsername,
  });
};

export const useSetUsername = () => {
  return useMutation({
    mutationFn: setUsername,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useFetchUser = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: fetchMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
