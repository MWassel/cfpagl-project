import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const ProtectedRoute = ({ children }) => {
  const token = useAuth();

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the protected page
  return children;
};

export default ProtectedRoute;
