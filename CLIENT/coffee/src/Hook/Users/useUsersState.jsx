import { useState } from "react";

export const useUsersState = (initialUsers = []) => {
    const [users, setUsers] = useState(initialUsers);

    const addUser = (user) => setUsers(prev => [...prev, user]);
    const removeUser = (id) => setUsers(prev => prev.filter(u => u.id !== id));
    const updateUser = (id, data) =>
        setUsers(prev => prev.map(u => u.id === id ? { ...u, ...data } : u));

    return { users, setUsers, addUser, removeUser, updateUser };
};
