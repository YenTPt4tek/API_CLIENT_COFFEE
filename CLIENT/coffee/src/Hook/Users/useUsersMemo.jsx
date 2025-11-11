import { useMemo } from "react";

export const useUsersMemo = (users) => {
    const sortedUsers = useMemo(() => {
        return [...users].sort((a, b) => a.name.localeCompare(b.name));
    }, [users]);

    return { sortedUsers };
};
