import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import useUser from '../Hooks/useUser';

export default function AdminRoute({ children }) {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // Ensure user exists before accessing email
    const email = user?.email;

    // Fetch user info only if email is available
    const { userInfo, isLoading } = useUser({ email });

    if (loading || isLoading) {
        return (
            <div className="flex justify-center items-center my-32">
                <span className="loading loading-ring loading-xs"></span>
                <span className="loading loading-ring loading-sm"></span>
                <span className="loading loading-ring loading-md"></span>
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    }

    if (user && userInfo.role === 'admin') {
        return children;
    }

    return <Navigate to="/" state={{ from: location.pathname }} replace />;
}

