import React, { createContext, useContext } from "react";
import { useValidateQuery } from "../redux/features/auth/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data, isLoading, error } = useValidateQuery();

  const isAuthenticated = data?.valid || false;
  const user = data?.user || null;

  if (isLoading) {
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated: false,
          user: null,
          isLoading: true,
        }}
      >
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-purple-600"></div>
        </div>
      </AuthContext.Provider>
    );
  }

  if (error) {
    console.error("Authentication validation failed:", error);
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated: false,
          user: null,
          isLoading: false,
          error: error,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
