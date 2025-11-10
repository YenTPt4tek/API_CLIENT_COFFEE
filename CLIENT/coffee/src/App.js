import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Components/AuthContext/AuthContext";
import ManagersRouters from "./Managers/routers";
import Users from "./Users/routers";
import { ToastMessageContainer } from "./Components/ToastMessage/ToastMessage";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/managers/*" element={<ManagersRouters />} />
        <Route path="/coffee/*" element={<Users/>} />
      </Routes>
      <ToastMessageContainer /> {/* 👈 Quan trọng */}
    </AuthProvider>
  );
}

export default App;
