import React, { createContext, useContext, useState, useEffect } from 'react';
import  { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  token: string | null;
  username: string | null;
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

export const AuthProvider: React.FC <{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('jwt-token'));
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('jwt-token');
    if (storedToken) {
      setToken(storedToken);
      try {
        const decodedToken: any = jwtDecode(storedToken);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error('Error decoding token:', error);
        setUsername(null);
      }
    } else {
      setUsername(null);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('jwt-token', token);
    setToken(token);
    try {
      const decodedToken: any = jwtDecode(token);
      setUsername(decodedToken.username);
    } catch (error) {
      console.error('Error decoding token:', error);
      setUsername(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt-token');
    setToken(null);
    setUsername(null);
  };

  const contextValue: AuthContextType = {
    token,
    username,
    login,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
