
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('admin_token');

    // Check if token exists
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Optional: Add token expiration check here if JWT is decodable
    // For now, presence check is sufficient as 401 api responses will handle invalid tokens

    return <Outlet />;
};

export default ProtectedRoute;
