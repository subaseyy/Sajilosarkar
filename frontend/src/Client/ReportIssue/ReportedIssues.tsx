import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  const userId = localStorage.getItem('id');

  useEffect(() => {
    if (!token) {
      alert('You are not authorized. Please login.');
      navigate('/login');
      return;
    }

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
  }, [token, navigate, userId]);

  const handleSelectReport = (id: number) => {
    navigate(`/dashboard/report-issue/report-detail/${id}`);
  };

  const handleDelete = async (orderId: number) => {
    try {
      const response = await axios.delete(`/api/issue/${userId}/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setReports((prevList) => prevList.filter((report) => report.id !== orderId));
      } else {
        console.error("Failed to delete order:", response);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="w-full md:w-4/5 lg:w-3/4 p-8">
        <h1 className="text-2xl font-bold mb-6">Reported Issues</h1>
        {reports.length === 0 ? (
          <p className="text-gray-600">No reported issues found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {reports.map(report => (
              <div key={report.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">{report.title}</h2>
                  <p className="text-gray-600 mb-2">{report.location}</p>
                  <p className="text-gray-800">{report.description}</p>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleSelectReport(report.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(report.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportedIssues;
