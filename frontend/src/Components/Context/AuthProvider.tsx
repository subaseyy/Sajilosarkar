import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the shape of the context value
interface AuthContextType {
  token: string;
  user: User | null;
  loginAction: (data: LoginData) => Promise<void>;
  logOut: () => void;
}

// Define the shape of the user object and login data
interface User {
  id: number;
  name: string;
  email: string;
  roles: string;
}

interface LoginData {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(localStorage.getItem("site") || "");
 
  
  const navigate = useNavigate();

  const loginAction = async (data: LoginData): Promise<void> => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Login error response:', errorResponse);
        throw new Error(errorResponse.error || 'Failed to login');
      }

      const res = await response.json();

      console.log('Login successful response:', res);

      if (res.token && res.name && res.roles && res.id) {
        const userDetail: User = {
          id: parseInt(res.id),
          name: res.name,
          email: data.email,
          roles: res.roles,
        };

        setUser(userDetail);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        navigate("/dashboard");
      } else {
        throw new Error('Invalid response data');
      }
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    

    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
