import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_MODE === "development"
      ? import.meta.env.VITE_BACKEND_URL_DEVELOPMENT
      : import.meta.env.VITE_BACKEND_URL_PRODUCTION,

  withCredentials: true,
});

const signup = async (data) => {
  const res = await api.post("/auth/signup", data);

  return res.data;
};

const signupStatus = async () => {
  const res = await api.get("auth/signup/status");
  return res.data;
};

const resendOTP = async () => {
  const res = await api.post("auth/resend-otp");
  return res.data;
};
const verifyOTP = async (data) => {
  const res = await api.post("auth/verify-otp", data);
  return res.data;
};

const checkUsername = async (data) => {
  const res = await api.post("auth/check-username", data);
  return res.data;
};

const setUsername = async (data) => {
  const res = await api.post("/auth/set-username", data);
  return res.data;
};

const login = async (data) => {
  const res = await api.post("auth/login", data);
  return res.data;
};

export {
  signup,
  resendOTP,
  signupStatus,
  verifyOTP,
  checkUsername,
  setUsername,
  login,
};
