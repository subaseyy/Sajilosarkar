import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar';
import ReportList from './ReportList';

interface Report {
  id: number;
  title: string;
  location: string;
  description: string;
  replies: string[];
}

const ReportedIssues: React.FC = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      alert('You are not authorized. Please login.');
      navigate('/login');
      return;
    }

    document.title = 'Reported Issues';

    fetch('/api/reports/list', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: Report[]) => { // Ensure data is typed correctly as Report[]
        setReports(data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [token, navigate]);

  const handleSelectReport = (id: number) => {
    navigate(`/dashboard/report-issue/report-detail/${id}`);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full bg-white p-8 rounded-lg shadow-md">
        <ReportList reports={reports} onSelectReport={handleSelectReport} />
      </div>
    </div>
  );
};

export default ReportedIssues;
