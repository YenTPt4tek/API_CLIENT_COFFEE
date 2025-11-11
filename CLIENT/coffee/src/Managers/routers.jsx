import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { routeConfig } from "./Define/routeConfig";
import LoginPage from "../Components/Login/LoginPage";
import DashboardLayout from "./Layout/DashboardLayout";
import ProtectedRoute from "./Define/ProtectedRoute";
import { useAuth } from "../Hook/AuthContext/AuthContext";
import { toast } from "react-toastify"; // ⚡ Thông báo đẹp

export default function ManagersRouters() {
  const { user, loading } = useAuth();


  // 🧠 Hàm kiểm tra quyền truy cập route
  const hasAccess = (route) => {
    if (!user) return false;
    const hasRole =
      !route.allowedRoles ||
      route.allowedRoles.map((r) => r.toLowerCase()).includes(user.role);

    const userPermissions = user.info?.permissions?.map(
      (p) => p.permission_name?.toLowerCase?.() || p.toLowerCase?.() || p
    ) || [];

    const hasPermission =
      !route.allowedPermissions ||
      route.allowedPermissions.some((p) =>
        userPermissions.includes(p.toLowerCase())
      );

    return hasRole && hasPermission;
  };

  return (
    <Routes>
      {/* 🔑 Trang đăng nhập */}
      <Route path="login" element={<LoginPage />} />

      {/* 🧩 Các route động dựa theo routeConfig */}
      {Object.entries(routeConfig).map(([groupKey, group]) =>
        group.routes.map((route) => {
          const PageComponent = route.component;

          // Nếu chưa đăng nhập → chuyển hướng login
          if (!user && !loading) {
            return (
              <Route
                key={route.path}
                path={route.path.replace("/managers/", "")}
                element={<Navigate to="/managers/login" replace />}
              />
            );
          }

          // Nếu có user nhưng không có quyền → hiển thị toast + unauthorized
          if (user && !loading && !hasAccess(route)) {
            toast.error("⛔ Bạn không có quyền truy cập trang này!");
            return (
              <Route
                key={route.path}
                path={route.path.replace("/managers/", "")}
                element={<Navigate to="/managers/unauthorized" replace />}
              />
            );
          }

          // ✅ Có quyền → hiển thị component trong layout
          return (
            <Route
              key={route.path}
              path={route.path.replace("/managers/", "")}
              element={
                <DashboardLayout>
                  <ProtectedRoute
                    element={<PageComponent />}
                    allowedRoles={route.allowedRoles}
                    allowedPermissions={route.allowedPermissions}
                  />
                </DashboardLayout>
              }
            />
          );
        })
      )}

      {/* 🚫 Trang không có quyền */}
      <Route
        path="/unauthorized"
        element={
          <div
            style={{
              display: "flex",
              height: "100vh",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              color: "red",
            }}
          >
            ⛔ Bạn không có quyền truy cập trang này.
          </div>
        }
      />

      {/* 🧭 Bắt mọi đường dẫn khác → login */}
      <Route path="*" element={<Navigate to="/managers/login" replace />} />
    </Routes>
  );
}
