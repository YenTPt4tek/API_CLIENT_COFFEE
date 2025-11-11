import { useState, useEffect } from "react";

export const useUsersEffect = (fetchUsers) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (err) {
                console.error("Load users error:", err);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, [fetchUsers]);

    return { users, loading, setUsers };
};
