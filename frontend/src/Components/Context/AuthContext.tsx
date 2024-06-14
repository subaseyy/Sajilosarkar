import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean; // Add isAuthenticated property
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('jwt-token'));
  const isAuthenticated = !!token; // Determine authentication status based on token presence

  const login = (token: string) => {
    localStorage.setItem('jwt-token', token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('jwt-token');
    setToken(null);
  };

  const contextValue: AuthContextType = {
    token,
    isAuthenticated, // Assign isAuthenticated based on token presence
    login,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
