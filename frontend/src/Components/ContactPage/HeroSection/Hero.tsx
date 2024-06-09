import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="hero-section bg-gray-200 py-12 text-center">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb-yYmFfRHZwlNQh5AyjFgJO8fOf19zIi73w&s" alt="Contact Us" className="mx-auto mb-4 rounded-lg shadow-lg" />
      <div className="hero-content">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-2 text-lg">We are here to assist you. Reach out to us through any of the methods below.</p>
      </div>
    </div>
  );
};

export default HeroSection;
