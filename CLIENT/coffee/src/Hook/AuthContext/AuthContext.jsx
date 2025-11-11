import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { saveToken, getToken, removeToken } from "../../httpServices/tokenServices";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getToken();

        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser({
                    token,
                    role: decoded.role_name?.toLowerCase() || null,
                    info: decoded,
                });
            } catch (error) {
                console.error("❌ Invalid token:", error);
                removeToken();
                setUser(null);
            }
        } else {
            setUser(null);
        }

        setLoading(false);
    }, []); // ✅ chỉ chạy 1 lần khi load app

    const login = (token) => {
        saveToken(token);
        const decoded = jwtDecode(token);
        setUser({
            token,
            role: decoded.role_name?.toLowerCase() || null,
            info: decoded,
        });
    };

    const logout = () => {
        removeToken();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
