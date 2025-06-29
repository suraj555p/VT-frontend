import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1", // 👈 change if your backend is hosted elsewhere
  withCredentials: true, // ✅ sends cookies (for auth)
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
