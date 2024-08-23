import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

interface User {
  roles: string[];
  name: string;
  id: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  loginAction: (credentials: { username: string; password: string }) => Promise<void>;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (
        event.key === "token" ||
        event.key === "name" ||
        event.key === "id"
      ) {
        logOut();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const loginAction = async (credentials: { username: string; password: string }) => {
    try {
      const response = await axios.post("/api/users/login", credentials);
      const { roles, name, id, token } = response.data;
      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("id", id);
      setUser({ roles, name, id });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
