import React from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import PreviousRequestList from '../../Components/PreviousRequestList/PreviousRequestList';


const PreviousRequest: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="w-3/4 p-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Previous Request</h1>
          < PreviousRequestList />
        </div>
      </div>
    </div>
  );
}

export default PreviousRequest;