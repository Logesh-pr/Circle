import { create } from "zustand";

export const useToken = create((set) => ({
  otpToken: sessionStorage.getItem("otpToken") || null,
  usernameToken: sessionStorage.getItem("usernameToken") || null,

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
}));
