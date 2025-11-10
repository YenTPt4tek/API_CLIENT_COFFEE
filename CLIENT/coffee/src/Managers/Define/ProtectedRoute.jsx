import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Components/AuthContext/AuthContext";

const ProtectedRoute = ({ element, allowedRoles, allowedPermissions }) => {
  const { user, loading } = useAuth();

  console.log("ProtectedRoute:", { user, loading });

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
        }}
      >
        🔄 Đang tải thông tin người dùng...
      </div>
    );
  }

  if (!user) {
    console.warn("⚠️ Chưa đăng nhập");
    return <Navigate to="/managers/login" replace />;
  }

  const userRole = user.role;
  const userPermissions = user.info?.permissions || [];

  const hasRole =
    !allowedRoles ||
    allowedRoles.map((r) => r.toLowerCase()).includes(userRole);

  const userPermissionNames = userPermissions.map(
    (p) => p.permission_name?.toLowerCase?.() || p.toLowerCase?.() || p
  );

  const hasPermission =
    !allowedPermissions ||
    allowedPermissions.some((p) => userPermissionNames.includes(p.toLowerCase()));

  if (!hasRole || !hasPermission) {
    console.warn("⛔ Không có quyền truy cập", { userRole, userPermissions });
    return <Navigate to="/managers/unauthorized" replace />;
  }

  return element;
};

export default ProtectedRoute;
