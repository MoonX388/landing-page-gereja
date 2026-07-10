import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:3001",
});

// Interceptor untuk menyisipkan Token JWT otomatis ke setiap request
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;