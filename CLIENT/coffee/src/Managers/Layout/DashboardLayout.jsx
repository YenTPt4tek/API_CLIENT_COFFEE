import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import HeaderLayout from "./HeaderLayout";
import SibarLayout from "./SideBarLayout";
import FooterLayout from "./FooterLayout";
import { loadDashboardHeadAssets } from "../Component/LoadStyleandScript/loadDashboardHeadAssets";
import { loadDashboardScripts } from "../Component/LoadStyleandScript/loadDashboardScripts";
import { useAuth } from "../../Hook/AuthContext/AuthContext";
import { MDBSpinner } from "mdb-react-ui-kit";

const DashboardLayout = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [renderDashboard, setRenderDashboard] = useState(false); // control render

    useEffect(() => {
        if (!user || !user.role) {
            setLoading(false);
            return;
        }

        let timer;

        const initDashboard = async () => {
            try {
                // Load CSS
                await loadDashboardHeadAssets();
                await new Promise(r => requestAnimationFrame(r)); // chờ CSS apply

                // Load JS
                await loadDashboardScripts();

                // ✅ delay render dashboard bằng setTimeout (ví dụ tối thiểu 500ms)
                timer = setTimeout(() => {
                    setRenderDashboard(true); // mới render Header, Sidebar, Outlet, Footer
                }, 500);
            } catch (err) {
                console.error(err);
                setRenderDashboard(true); // fallback vẫn render dashboard nếu lỗi
            } finally {
                setLoading(false);
            }
        };

        initDashboard();

        return () => clearTimeout(timer); // cleanup khi unmount
    }, [user]);

    if (!user || !user.role) return null;

    // Spinner
    if (loading) {
        return (
            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                <MDBSpinner grow role="status" color="primary">
                    <span className="visually-hidden">Loading...</span>
                </MDBSpinner>
                <p className="mt-3">Account Loading...</p>
            </div>
        );
    }

    // Render Dashboard sau timeout
    return renderDashboard ? (
        <>
            <HeaderLayout />
            <SibarLayout />
            <main id="main" className="main">
                <Outlet />
            </main>
            <FooterLayout />
        </>
    ) : null;
};

export default DashboardLayout;
