import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_MODE === "development"
      ? import.meta.env.VITE_BACKEND_URL_DEVELOPMENT
      : import.meta.env.VITE_BACKEND_URL_PRODUCTION,
});

const signup = async (data) => {
  const res = await api.post("/auth/signup", data);

  return res.data;
};

export { signup };
