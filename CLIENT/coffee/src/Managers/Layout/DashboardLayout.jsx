
import { Outlet, useNavigate } from "react-router-dom";

import HeaderLayout from "./HeaderLayout";
import SibarLayout from "./SideBarLayout";
import FooterLayout from "./FooterLayout";
import { useEffect } from "react";

import { loadDashboardHeadAssets } from "../Component/LoadStyleandScript/loadDashboardHeadAssets";

import { loadDashboardScripts } from "../Component/LoadStyleandScript/loadDashboardScripts";
import { useAuth } from "../../Components/AuthContext/AuthContext";


const DashboardLayout = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    useEffect(() => {
        const initDashboard = async () => {
            try {
                // 🚫 Nếu chưa có user hoặc chưa có role => chuyển đến trang login
                if (!user || !user.role) {
                    navigate("/managers/login", { replace: true });
                    return; // ⛔ Dừng lại, không load CSS/JS
                }

                // ✅ Nếu có user, load asset
                await loadDashboardHeadAssets();
                await loadDashboardScripts();

            } catch (error) {
                console.error("⚠️ Lỗi khi load CSS/JS dashboard:", error);
            }
        };

        initDashboard();
    }, [user, navigate]);

    // ⏳ Nếu chưa có user => không render dashboard layout
    if (!user || !user.role) {
        return null;
    }
    return (
        <>
            <HeaderLayout />
            <SibarLayout />
            <main id="main" className="main">
                <Outlet />
            </main>
            <FooterLayout />
        </>
    );
};

export default DashboardLayout;
