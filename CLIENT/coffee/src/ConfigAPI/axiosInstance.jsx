// src/api/axiosInstance.js
import axios from "axios";

// 🔹 Tạo instance chung
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 40000,
    headers: {
        "Content-Type": "application/json",
    },
});

// 🔹 Gắn token vào tất cả request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 🔹 Gắn interceptor response (nếu cần xử lý lỗi hoặc refresh token)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Axios error:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;
