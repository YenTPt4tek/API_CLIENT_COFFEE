import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * ⚡ Hàm gọi nhanh thông báo toast
 * @param {string} message - nội dung thông báo
 * @param {"success" | "error" | "warning" | "info"} type - loại thông báo
 */
export const toastMessage = (message, type = "info") => {
    const options = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
    };

    switch (type) {
        case "success":
            toast.success(`✅ ${message}`, options);
            break;
        case "error":
            toast.error(`❌ ${message}`, options);
            break;
        case "warning":
            toast.warning(`⚠️ ${message}`, options);
            break;
        default:
            toast.info(`ℹ️ ${message}`, options);
            break;
    }
};

/**
 * 🧩 Component dùng để render ToastContainer
 * 👉 đặt trong App.jsx hoặc Layout chính
 */
export const ToastMessageContainer = () => <ToastContainer />;
