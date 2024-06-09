import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="hero-section bg-gray-200 py-12 text-center">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd6dAu6Oc8c9odW_rYNigKUrFd7yTxfM0MDw&s" alt="Infrastructure Issues" className="mx-auto mb-4 rounded-lg shadow-lg" />
      <div className="hero-content">
        <h1 className="text-4xl font-bold">Features of Sajilo Sarkar</h1>
        <p className="mt-2 text-lg">Discover how we streamline the reporting and resolution of infrastructure issues.</p>
      </div>
    </div>
  );
};

export default HeroSection;
