import React from 'react';

const SocialMediaLinks: React.FC = () => {
  return (
    <section className="social-media-links py-12 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-4">Connect with Us</h2>
      <div className="flex justify-center space-x-4">
        <a href="https://facebook.com/sajilosarkar" className="text-blue-600 text-2xl">Facebook</a>
        <a href="https://twitter.com/sajilosarkar" className="text-blue-400 text-2xl">Twitter</a>
        <a href="https://instagram.com/sajilosarkar" className="text-pink-600 text-2xl">Instagram</a>
      </div>
    </section>
  );
};

export default SocialMediaLinks;
