import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar';

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

    const userId = localStorage.getItem('id');

    document.title = 'Reported Issues';

    fetch(`/api/issue/${userId}/list`, {
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
      .then((data: Report[]) => {
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
        <h1 className="text-2xl font-bold mb-4">Reported Issues</h1>
        {reports.length === 0 ? (
          <p>No reported issues found.</p>
        ) : (
          <ul>
            {reports.map(report => (
              <li key={report.id} className="mb-4 p-4 border rounded cursor-pointer" onClick={() => handleSelectReport(report.id)}>
                <h2 className="text-xl font-semibold">{report.title}</h2>
                <p className="text-gray-600">{report.location}</p>
                <p className="mt-2">{report.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReportedIssues;
