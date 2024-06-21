import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  token: string | null;
  name: string | null;
  id: string | null;
  isAuthenticated: boolean; 
  login: (token: string, name: string, id : string) => void;
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
  const [id, setId] = useState<string | null>(localStorage.getItem('user-id'));
  const isAuthenticated = !!token; 

  const login = (token: string, name: string, id:string) => {
    localStorage.setItem('jwt-token', token);
    setToken(token);
    localStorage.setItem('first-name', name);
    setName(name);
    localStorage.setItem('user-id', id);
    setId(id);
  };

  const logout = () => {
    localStorage.removeItem('jwt-token');
    localStorage.removeItem('first-name');
    localStorage.removeItem('user-id');
    setToken(null);
  };

  const contextValue: AuthContextType = {
    token,
    name,
    id,
    isAuthenticated, // Assign isAuthenticated based on token presence
    login,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
