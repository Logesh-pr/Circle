import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useAuthStore = create(
  devtools((set) => ({
    user: null,
    isAuthenticated: false,

    setUser: (user) => set({ user, isAuthenticated: true }),
    clearUser: () => set({ user: null, isAuthenticated: false }),
  })),
);

export const useResendOTPStore = create(
  devtools((set) => ({
    resendAvailableAt: sessionStorage.getItem("resendAvailableAt") || null,
    resendAttempts: Number(sessionStorage.getItem("resendAttempts")) || 0,
    maxOTPResendAttempts: 3,
    setResendData: (resendAvailableAt, resendAttempts) => {
      sessionStorage.setItem("resendAvailableAt", resendAvailableAt);
      sessionStorage.setItem("resendAttempts", String(resendAttempts));
      set({ resendAvailableAt, resendAttempts });
    },

    clearResendData: () => {
      sessionStorage.removeItem("resendAvailableAt");
      sessionStorage.removeItem("resendAttempts");

      set({ resendAvailableAt: null, resendAttempts: 0 });
    },
  })),
);

export const useTempUserStore = create(
  devtools((set) => ({
    tempUsername: null,

    setTempUsername: (username) => {
      set({ tempUsername: username });
    },

    clearTempUsername: () => {
      set({ tempUsername: null });
    },
  })),
);

export const useStepIndicatorStore = create((set) => ({
  currentStep: "signup",

  setStepIndicator: (step) => {
    set({ currentStep: step });
  },
}));
