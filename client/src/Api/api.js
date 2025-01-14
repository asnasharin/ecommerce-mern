import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce-mern-1-gihk.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});

// Interceptor to dynamically add token
api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
