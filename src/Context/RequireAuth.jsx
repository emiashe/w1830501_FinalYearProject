import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from '../Hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    // Normalize roles to always be an array
    const userRoles = Array.isArray(auth?.roles)
        ? auth.roles
        : auth?.roles
            ? [auth.roles]
            : [];

    return (
        userRoles.find(role => allowedRoles?.includes(role))
        ? <Outlet />
        : auth?.accessToken
            ? <Navigate to="/register" state={{ from: location }} replace />
            : <Navigate to="/" state={{ from: location }} replace />
    );
};

export default RequireAuth;