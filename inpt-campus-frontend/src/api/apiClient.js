import axios from "axios";

// Base Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
