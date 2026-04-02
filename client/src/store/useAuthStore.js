import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useTokenStore = create(
  devtools((set) => ({
    otpToken: sessionStorage.getItem("otpToken") || null,

    setOTPToken: (token) => {
      sessionStorage.setItem("otpToken", token);

      set({ otpToken: token });
    },

    usenameToken: (token) => {
      sessionStorage.removeItem("otpToken");
      sessionStorage.setItem("usernameToken", token);
      set({ otpToken: null, usernameToken: token });
    },
    clearToken: () => {
      sessionStorage.removeItem("usernameToken");
      set({ usenameToken: null });
    },
  })),
);

export const useResendOTPStore = create(
  devtools((set) => ({
    otpResendAvailableAt: null,
    otpResendAttempts: 0,

    setOTPResendAvailableAt: (time) => {
      set({ otpResendAvailableAt: time });
    },
    setOTPResendAttempts: (attempt) => {
      set({ otpResendAttempts: attempt });
    },
  })),
);
