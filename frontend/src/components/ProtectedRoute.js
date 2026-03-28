import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { token, initializing } = useAuth();
  const location = useLocation();

  if (initializing) {
    return <div className="page-loader">Loading session...</div>;
  }

  if (!token) {
    return <Navigate replace state={{ from: location }} to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
