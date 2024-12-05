import React, { createContext, useContext } from "react";
import { useValidateQuery } from "../redux/features/auth/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data, isLoading, error } = useValidateQuery();
  console.log(data);
  const isAuthenticated = data?.isAuthenticated || false;
  console.log(isAuthenticated);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Authentication validation failed:", error);
    // Return the context with `isAuthenticated: false` even on error
    return (
      <AuthContext.Provider value={{ isAuthenticated: false }}>
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
