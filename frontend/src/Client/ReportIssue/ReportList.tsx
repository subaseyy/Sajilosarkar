import React from 'react';

interface Report {
  id: number;
  title: string;
  location: string;
  description: string;
  replies: string[];
}

interface ReportListProps {
  reports: Report[];
  onSelectReport: (id: number) => void;
}

const ReportList: React.FC<ReportListProps> = ({ reports, onSelectReport }) => {
  const handleReportClick = (id: number) => {
    onSelectReport(id);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Reported Issues</h2>
      <ul className="space-y-2">
        {reports.map((report) => (
          <li 
            key={report.id} 
            className="p-4 bg-gray-50 border rounded-md cursor-pointer hover:bg-gray-100"
            onClick={() => handleReportClick(report.id)}
          >
            <h3 className="text-xl font-bold">{report.title}</h3>
            <p className="text-gray-600">{report.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportList;
