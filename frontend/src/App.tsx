import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./landingpages/Home";
import About from "./landingpages/About";
import Feature from "./landingpages/Feature";
import Contact from "./landingpages/Contact";
import Login from "./Auth/Login";
import Dashboard from "./Client/Dashboard";
import SignUp from "./Auth/SignUp";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import NewIssueReport from "./Client/ReportIssue/NewIssueReport";
import Profile from "./Client/Profile";
import ReportList from "./Client/ReportIssue/ReportList";
import ReportedIssues from "./Client/ReportIssue/ReportedIssues";
import AuthProvider from "./Components/Context/AuthProvider";

const App: React.FC = () => {
  const [reports, setReports] = React.useState([]);
  const handleSelectReport = (report: any) => {
    console.log(report);
  };

  return (
    <Router>
      <AuthProvider>
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
          <Route
            path="/dashboard/report-issue/new-issue"
            element={
              <ProtectedRoute>
                <NewIssueReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/report-issue/report-detail/:id"
            element={
              <ProtectedRoute>
                <ReportList reports={reports} onSelectReport={handleSelectReport} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/report-issue/report-list"
            element={
              <ProtectedRoute>
                <ReportedIssues />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
