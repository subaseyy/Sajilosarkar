import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
import About from "./Components/About";
import Feature from "./Components/Feature";
import Contact from "./Components/Contact";
import Login from "./Components/Login";

import { AuthProvider } from "./Components/Context/AuthContext";
import Dashboard from "./Components/Dashboard";
import SignUp from "./Components/SignUp";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
// import AuthHandlerComponent from "./Components/Context/AuthHandlerComponent";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
      {/* <AuthHandlerComponent /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Feature />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faqs" element={<Feature />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
