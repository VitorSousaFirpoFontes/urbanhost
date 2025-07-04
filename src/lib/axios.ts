// lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // <- corrigido para 3001
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
