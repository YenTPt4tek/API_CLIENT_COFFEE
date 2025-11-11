import { useCallback } from "react";

export const useUsersCallback = (setUsers) => {
    const addUser = useCallback((user) => {
        setUsers(prev => [...prev, user]);
    }, [setUsers]);

    const removeUser = useCallback((id) => {
        setUsers(prev => prev.filter(u => u.id !== id));
    }, [setUsers]);

    const updateUser = useCallback((id, data) => {
        setUsers(prev => prev.map(u => u.id === id ? { ...u, ...data } : u));
    }, [setUsers]);

    return { addUser, removeUser, updateUser };
};
