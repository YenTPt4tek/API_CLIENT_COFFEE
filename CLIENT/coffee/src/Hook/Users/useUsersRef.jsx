import { useRef } from "react";

export const useUsersRef = () => {
    const usersRef = useRef([]);

    const setRef = (index, el) => {
        usersRef.current[index] = el;
    };

    return { usersRef, setRef };
};
