import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { saveToken, getToken, removeToken } from "../../httpServices/tokenServices";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const decoded = jwtDecode(token);

            // kiểm tra token hết hạn
            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                removeToken();
                setUser(null);
            } else {
                setUser({
                    token,
                    role: decoded.role_name?.toLowerCase() || null,
                    info: decoded,
                });
            }
        } catch (error) {
            console.error("❌ Invalid token:", error);
            removeToken();
            setUser(null);
        }

        setLoading(false);
    }, []);

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
