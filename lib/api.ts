import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || (
  process.env.NODE_ENV === "production"
    ? "https://api.gerejapintar.id"
    : "http://localhost:8080"
);

const api = axios.create({
  baseURL: apiBaseUrl,
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
