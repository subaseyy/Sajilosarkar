import './App.css';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import About from './Components/About';
import Contact from './Components/Contact';
import Feature from './Components/Feature';
import FeaturePage from './Components/FeaturePage/FeaturePage';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from './Components/Navbar/Navbar';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

interface AuthContextType {
  user: string | null;
  login: (username: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser(username);
    }
  }, []);

  const login = (username: string, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />  
        <Footer />
      </>
    ), 
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "features",
        element: <Feature />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "faqs",
        element: <FeaturePage />,
      },
      {
        path: "login",
        element: <Login />,
      }
    ],
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
