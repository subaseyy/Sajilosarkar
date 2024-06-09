import React from 'react';

const BenefitsInDepth: React.FC = () => {
  return (
    <section className="benefits-in-depth py-12 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-8">Benefits in Depth</h2>
      <div className="flex flex-wrap justify-center">
        <div className="benefit mx-4 mb-8 text-center w-64">
          <h3 className="text-xl font-semibold mb-2">Faster Resolution</h3>
          <p className="text-md">
            Our platform streamlines the reporting process and significantly reduces issue resolution time.
          </p>
        </div>
        <div className="benefit mx-4 mb-8 text-center w-64">
          <h3 className="text-xl font-semibold mb-2">Improved Communication</h3>
          <p className="text-md">
            Sajilo Sarkar facilitates better communication between users and authorities regarding infrastructure issues.
          </p>
        </div>
        <div className="benefit mx-4 mb-8 text-center w-64">
          <h3 className="text-xl font-semibold mb-2">Transparency and Accountability</h3>
          <p className="text-md">
            Our platform promotes transparency and accountability in infrastructure maintenance and management.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BenefitsInDepth;
