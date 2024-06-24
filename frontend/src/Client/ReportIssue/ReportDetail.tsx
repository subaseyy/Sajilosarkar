import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar';

interface Report {
  id: number;
  title: string;
  location: string;
  description: string;
  replies: string[]; // Assuming replies are strings
}

const ReportDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<Report | null>(null);
  const [replyText, setReplyText] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      alert('You are not authorized. Please login.');
      return;
    }

    document.title = 'Report Detail';

    fetch(`/api/issue/details/${id}`, {
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
      .then((data: Report) => {
        setReport(data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [id, token]);

  const handleReplySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      alert('You are not authorized. Please login.');
      return;
    }

    fetch(`/api/issue/${id}/reply`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reply: replyText }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Assuming you want to refresh the report after adding a reply
        return fetch(`/api/issue/details/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      })
      .then(response => response.json())
      .then((data: Report) => {
        setReport(data);
        setReplyText(''); // Clear reply input after successful submission
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  if (!report) {
    return (
      <div className='flex'>
        <div><Sidebar /></div>
        <div className='texts-center font-extrabold'> Loading... </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">{report.title}</h1>
        <p className="text-gray-600">{report.location}</p>
        <p className="mt-2">{report.description}</p>
        <h3 className="text-lg font-semibold mt-4">Replies:</h3>
        <ul className="list-disc pl-5">
          {report.replies && report.replies.length > 0 ? (
            report.replies.map((reply, index) => (
              <li key={index} className="mt-2">{reply}</li>
            ))
          ) : (
            <li>No replies yet.</li>
          )}
        </ul>
        <form onSubmit={handleReplySubmit} className="mt-4">
          <label htmlFor="reply">Add Reply:</label>
          <textarea
            id="reply"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 mt-1 p-2"
            required
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit Reply
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportDetail;
