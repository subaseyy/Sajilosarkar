import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar';

interface Report {
  id: number;
  title: string;
  location: string;
  description: string;
  replies: string[];
}

interface ReportDetailProps {
  reports: Report[];
  onReply: (id: number, reply: string) => void;
}

const ReportDetail: React.FC<ReportDetailProps> = ({ reports, onReply }) => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<Report | null>(null);
  const [reply, setReply] = useState('');

  useEffect(() => {
    const reportId = parseInt(id || '0', 10);
    const selectedReport = reports.find((report) => report.id === reportId);
    setReport(selectedReport || null);
  }, [id, reports]);

  if (!report) {
    return <div className="p-4 bg-white rounded-lg shadow-md">Select a report to view details</div>;
  }

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReply(report.id, reply);
    setReply('');
  };

  return (
    <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="w-full bg-white p-8 rounded-lg shadow-md">
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{report.title}</h2>
      <p className="text-gray-600 mb-4">{report.location}</p>
      <p className="mb-4">{report.description}</p>
      <div>
        <h3 className="text-xl font-semibold mb-2">Replies</h3>
        <ul className="space-y-2 mb-4">
          {report.replies.map((reply, index) => (
            <li key={index} className="p-2 bg-gray-50 border rounded-md">{reply}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleReplySubmit}>
        <textarea
          className="w-full p-2 border rounded-md mb-2"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Write a reply..."
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700"
        >
          Submit Reply
        </button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default ReportDetail;

