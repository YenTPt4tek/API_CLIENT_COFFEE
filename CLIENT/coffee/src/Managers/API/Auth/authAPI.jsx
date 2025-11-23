import { httpService } from "../../../httpServices/httpServices";

// 🧩 Đăng ký user
export const registerUser = async (full_name, username, email, password, role = "Customer") => {
    try {
        const data = await httpService.post(`/auth/register?role=${role}`, {
            full_name,
            username,
            email,
            password,
        });

        if (data?.token) {
            localStorage.setItem("token", data.token);
        }

        return data;
    } catch (error) {
        console.error("❌ Lỗi khi đăng ký:", error);
        throw new Error(error.message || "Đăng ký thất bại, vui lòng thử lại!");
    }
};


// 🧩 Đăng nhập user
export const loginUser = async (email, password) => {
    try {
        const response = await httpService.post("/auth/login", { email, password });
        const data = response || response?.data ;

        if (data?.token) {
            localStorage.setItem("token", data.data.token);
        }

        return data;
    } catch (error) {
        console.error("❌ Lỗi khi đăng nhập:", error.response || error.message);
        throw new Error(error.response?.data?.message || "Đăng nhập thất bại, vui lòng kiểm tra lại thông tin!");
    }
};

// 🧩 Đăng xuất
export const logoutUser = () => {
    try {
        localStorage.removeItem("token");
        console.info("✅ Đã đăng xuất thành công.");
    } catch (error) {
        console.error("❌ Lỗi khi đăng xuất:", error.message);
    }
};
