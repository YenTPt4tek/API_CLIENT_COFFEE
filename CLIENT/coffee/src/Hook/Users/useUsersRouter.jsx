import { useLocation, useParams } from "react-router-dom";

export const useUsersRouter = () => {
    const location = useLocation();
    const params = useParams(); // /users/:id

    return { location, params };
};
