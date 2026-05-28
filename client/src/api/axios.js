import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_MODE === "development"
      ? import.meta.env.VITE_BACKEND_URL_DEVELOPMENT
      : import.meta.env.VITE_BACKEND_URL_PRODUCTION,

  withCredentials: true,
});

// 1. Create variables to hold the lock and the waiting queue
let isRefreshing = false;
let failedQueue = [];
// 2. Helper function to process all waiting requests
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 3. If a refresh is already happening, PAUSE this request and add it to the queue
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
      // 4. Lock the interceptor so no other requests can trigger a refresh
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        await axios.post(
          `${
            import.meta.env.VITE_MODE === "development"
              ? import.meta.env.VITE_BACKEND_URL_DEVELOPMENT
              : import.meta.env.VITE_BACKEND_URL_PRODUCTION
          }/auth/refresh`,
          {},
          { withCredentials: true },
        );
        // 5. Refresh succeeded! Release the queued requests so they can retry
        processQueue(null);
        return api(originalRequest);
      } catch (err) {
        // 6. Refresh failed entirely (e.g. refresh token expired). Reject all queued requests.
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        // 7. Unlock the interceptor
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export const signup = async (data) => {
  const res = await api.post("/auth/signup", data);

  return res.data;
};

export const signupStatus = async () => {
  const res = await api.get("auth/signup/status");
  return res.data;
};

export const resendOTP = async () => {
  const res = await api.post("auth/resend-otp");
  return res.data;
};
export const verifyOTP = async (data) => {
  const res = await api.post("auth/verify-otp", data);
  return res.data;
};

export const checkUsername = async (data) => {
  const res = await api.post("auth/check-username", data);
  return res.data;
};

export const setUsername = async (data) => {
  const res = await api.post("/auth/set-username", data);
  return res.data;
};

export const login = async (data) => {
  const res = await api.post("auth/login", data);
  return res.data;
};

export const fetchMe = async () => {
  const res = await api.get("/auth/fetch-me");
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const fetchPost = async () => {
  const res = await api.get("/post/all-post");
  return res.data.data;
};
export const fetchPostByProfile = async (username) => {
  const res = await api.get(`/post/all-post-by-profile/${username}`);
  console.log(res.data);
  return res.data.data;
};
export const createPost = async (data) => {
  const res = await api.post("/post/create-post", data);
  return res.data;
};

export const likePost = async (postId) => {
  const res = await api.post(`/post/like-post/${postId}`);
  console.log(res.data);
  return res.data;
};

export const bookmarkPost = async (postId) => {
  const res = await api.post(`/post/bookmark-post/${postId}`);
  console.log(res.data);
  return res.data;
};

export const getAllBookmarks = async () => {
  const res = await api.get("/post/all-bookmarks");
  console.log(res);
  return res.data.data.map((bookmark) => bookmark.post);
};

export const commentPost = async (postId, data) => {
  console.log(postId, data);
  const res = await api.post(`/post/comment-post/${postId}`, data);
  return res.data;
};

export const getAllComments = async (postId) => {
  const res = await api.get(`/post/all-comments/${postId}`);
  console.log(postId);
  return res.data;
};

export const searchUsers = async (query) => {
  const res = await api.get(`/user/search?q=${encodeURIComponent(query)}`);
  return res.data.data;
};

export const fetchUserProfile = async (username) => {
  const res = await api.get(`/user/get-user-profile/${username}`);
  return res.data.data;
};

export const followUser = async (username) => {
  const res = await api.post(`/user/follow/${username}`);
  console.log(res.data);
  return res.data.data;
};
