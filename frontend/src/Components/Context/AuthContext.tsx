import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  token: string | null;
  name: string | null;
  isAuthenticated: boolean; 
  login: (token: string, name: string) => void;
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
  const [name, setName] = useState<string | null>(localStorage.getItem('first-name'));
  const isAuthenticated = !!token; 

  const login = (token: string, name: string) => {
    localStorage.setItem('jwt-token', token);
    setToken(token);
    localStorage.setItem('first-name', name);
    setName(name);
  };

  const logout = () => {
    localStorage.removeItem('jwt-token');
    localStorage.removeItem('first-name');
    setToken(null);
  };

  const contextValue: AuthContextType = {
    token,
    name,
    isAuthenticated, // Assign isAuthenticated based on token presence
    login,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
