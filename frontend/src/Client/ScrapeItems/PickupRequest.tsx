import React from "react";

import Sidebar from "../../Components/Sidebar/Sidebar";
import PickupRequestForm from "../../Components/PickupRequestForm/PickupRequestForm";
import PreviousRequestList from "../../Components/PreviousRequestList/PreviousRequestList";

const PickupRequest: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="w-3/4 p-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div>
            <PickupRequestForm />
          </div>
          <div className="mt-4">
            <PreviousRequestList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupRequest;
