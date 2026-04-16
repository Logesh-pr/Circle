import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_MODE === "development"
      ? import.meta.env.VITE_BACKEND_URL_DEVELOPMENT
      : import.meta.env.VITE_BACKEND_URL_PRODUCTION,

  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // call refresh endpoint
        await axios.post(
          `${
            import.meta.env.VITE_MODE === "development"
              ? import.meta.env.VITE_BACKEND_URL_DEVELOPMENT
              : import.meta.env.VITE_BACKEND_URL_PRODUCTION
          }/auth/refresh`,
          {},
          { withCredentials: true },
        );

        // retry original request
        return api(originalRequest);
      } catch (err) {
        // refresh failed → logout user
        // window.location.href = "/auth/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

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

const fetchMe = async () => {
  const res = await api.get("/auth/fetch-me");
  return res.data;
};

const logout = async () => {
  const res = await api.post("/auth/logout");
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
  fetchMe,
  logout,
};
