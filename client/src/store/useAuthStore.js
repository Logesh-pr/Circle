import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,

        setUser: (user) => set({ user, isAuthenticated: true }),
        clearUser: () => set({ user: null, isAuthenticated: false }),
      }),
      {
        name: "auth-storage",
      },
    ),
  ),
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
