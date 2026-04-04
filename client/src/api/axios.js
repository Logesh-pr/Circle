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

const checkOTPStatus = async () => {
  const res = await api.get("/auth/otpStatus");
  return res.data;
};

const resendOTP = async (token) => {
  console.log(token);
  const res = await api.post(
    "/auth/resend-otp",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export { signup, resendOTP, checkOTPStatus };
