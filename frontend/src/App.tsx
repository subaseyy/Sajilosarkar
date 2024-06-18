import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./landingpages/Home";
import About from "./landingpages/About";
import Feature from "./landingpages/Feature";
import Contact from "./landingpages/Contact";
import Login from "./Auth/Login";
import { AuthProvider } from "./Components/Context/AuthContext";
import Dashboard from "./Client/Dashboard";
import SignUp from "./Auth/SignUp";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import NewIssueReport from "./Client/ReportIssue/NewIssueReport";
import Profile from "./Client/Profile";
import ReportDetail from "./Client/ReportIssue/ReportDetail";
import ReportList from "./Client/ReportIssue/ReportList";

interface Report {
  id: number;
  title: string;
  location: string;
  description: string;
  replies: string[];
}

const App: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      title: 'Pothole on Main Street',
      location: 'Main Street, Springfield',
      description: 'There is a large pothole on Main Street that needs to be fixed.',
      replies: ['Thank you for reporting!', 'We will look into it.']
    },
    {
      id: 2,
      title: 'Streetlight not working',
      location: '2nd Avenue, Springfield',
      description: 'The streetlight at the corner of 2nd Avenue and Elm Street is not working.',
      replies: []
    },
    // Add more reports as needed
  ]);
  // const [selectedReportId, setSelectedReportId] = useState<number | null>(null);

  // const handleSelectReport = (id: number) => {
  //   setSelectedReportId(id);
  // };

  const handleReply = (id: number, reply: string) => {
    setReports(reports.map(report => 
      report.id === id ? { ...report, replies: [...report.replies, reply] } : report
    ));
  };

  return (
    <AuthProvider>
      <Router>
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
                <ReportDetail reports={reports} onReply={handleReply} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/report-issue/report-list"
            element={
              <ProtectedRoute>
                <ReportList reports={reports} onSelectReport={handleSelectReport} />
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
      </Router>
    </AuthProvider>
  );
};

export default App;
