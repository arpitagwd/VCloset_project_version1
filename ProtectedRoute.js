import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        const userConfirmed = window.confirm("You need to log in to access this page. Do you want to log in now?");
        if (userConfirmed) {
            return <Navigate to="/login" state={{ message: "Please log in to continue", from: location.pathname }} />;
        } else {
            return null; // Stay on the current page
        }
    }

    return children;
};

export default ProtectedRoute;
