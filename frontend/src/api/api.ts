import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ""; // empty -> use proxy in dev

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 10000,
});

// Interceptors for errors can be added
api.interceptors.response.use(
  res => res,
  err => {
    // you can centralize error handling here
    return Promise.reject(err);
  }
);