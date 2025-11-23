import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import FooterLayout from "./FooterLayout";
import Header from "../Component/Header/Header";
import { useAuth } from "../../Hook/AuthContext/AuthContext";

import DashboardAssets from "../../Components/LoadStyleandScript/DashboardAssets";
import loadDashboardScripts from "../../Components/LoadStyleandScript/loadDashboardScripts";

import { messages, notifications, profile } from "../data/headerData";
import SidebarLayout from "../Component/SideBar/SideBarLayout";

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    const [jsLoaded, setJsLoaded] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true); // state toggle sidebar

    const vendorScripts = useRef([
        "vendor/bootstrap/js/bootstrap.bundle.min.js",
        "vendor/apexcharts/apexcharts.min.js",
        "vendor/chart.js/chart.umd.js",
        "vendor/echarts/echarts.min.js",
        "vendor/quill/quill.min.js",
        "vendor/simple-datatables/simple-datatables.js",
        "vendor/tinymce/tinymce.min.js",
        "vendor/php-email-form/validate.js",
    ]);

    const dashboardCSS = [
        "vendor/bootstrap/css/bootstrap.min.css",
        "vendor/bootstrap-icons/bootstrap-icons.css",
        "vendor/boxicons/css/boxicons.min.css",
        "vendor/quill/quill.snow.css",
        "vendor/quill/quill.bubble.css",
        "vendor/remixicon/remixicon.css",
        "vendor/simple-datatables/style.css",
        "css/style.css",
    ];

    // Load JS dashboard khi user đã xác thực
    useEffect(() => {
        if (!user) return;

        const load = async () => {
            try {
                await loadDashboardScripts(vendorScripts.current);
                setJsLoaded(true);

                AOS.init({
                    duration: 600,
                    easing: "ease-out",
                    once: true,
                });

                AOS.refresh();
            } catch (error) {
                console.error("JS dashboard error:", error);
                setJsLoaded(true);
            }
        };

        load();
    }, [user]);

    // Bật/tắt class toggle-sidebar vào body
    useEffect(() => {
        if (sidebarOpen) {
            document.body.classList.remove("toggle-sidebar");
        } else {
            document.body.classList.add("toggle-sidebar");
        }
    }, [sidebarOpen]);

    if (!jsLoaded) return null;

    return (
        <>
            <DashboardAssets paths={dashboardCSS} />

            <Header
                user={user}
                notifications={notifications}
                messages={messages}
                profile={profile}
                handleLogout={logout}
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} // gửi function xuống Header
            />

            <SidebarLayout />

            <main id="main" className="main" data-aos="fade-up" data-aos-delay="100">
                <Outlet />
            </main>

            <FooterLayout />
        </>
    );
};

export default DashboardLayout;
