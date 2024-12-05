import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Extract only `isAuthenticated`

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children; // Render the protected route if authenticated
};

export default ProtectedRoute;
