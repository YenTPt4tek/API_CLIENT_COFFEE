// src/Services/tokenService.js
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.REACT_APP_DEFAULT_TOKEN; // ⚠️ Nên lưu ở biến môi trường .env

// 🔒 Lưu token (mã hóa)
export const saveToken = (token) => {
    try {
        const encrypted = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
        localStorage.setItem("token", encrypted);
    } catch (error) {
        console.error("Error saving token:", error);
    }
};

// 🔓 Lấy token (giải mã)
export const getToken = () => {
    try {
        const encrypted = localStorage.getItem("token");
        if (!encrypted) return null;
        const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        return decrypted || null;
    } catch (error) {
        console.error("Error decrypting token:", error);
        return null;
    }
};

// 🗑️ Xóa token
export const removeToken = () => {
    localStorage.removeItem("token");
};
