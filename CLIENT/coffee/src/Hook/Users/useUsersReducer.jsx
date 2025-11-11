import { useReducer } from "react";

const initialState = {
    users: [],
    loading: false,
    error: null,
};

const usersReducer = (state, action) => {
    switch (action.type) {
        case "SET_USERS": return { ...state, users: action.payload };
        case "ADD_USER": return { ...state, users: [...state.users, action.payload] };
        case "REMOVE_USER": return { ...state, users: state.users.filter(u => u.id !== action.payload) };
        case "SET_LOADING": return { ...state, loading: action.payload };
        case "SET_ERROR": return { ...state, error: action.payload };
        default: return state;
    }
};

export const useUsersReducer = () => {
    const [state, dispatch] = useReducer(usersReducer, initialState);

    return { state, dispatch };
};
