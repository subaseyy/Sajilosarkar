import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  roles: string[];
  name: string;
  id: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  loginAction: (credentials: { username: string; password: string }) => Promise<void>;
  logOut: () => void; // Add logout function to AuthContextType
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

  const loginAction = async (credentials: { username: string; password: string }) => {
    try {
      const response = await axios.post("/api/users/login", credentials);
      const { roles, name, id, token } = response.data;
      setToken(token);
      localStorage.setItem("token", token);
      setUser({ roles, name, id });
      navigate("/dashboard");
      // fetchUserDetails(token);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // const fetchUserDetails = async (token: string) => {
  //   try {
  //     const response = await axios.get("/api/users/me", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setUser(response.data);
  //   } catch (error) {
  //     console.error("Error fetching user details", error);
  //   }
  // };

  // useEffect(() => {
  //   if (token) {
  //     fetchUserDetails(token);
  //   }
  // }, [token]);

  const logOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
