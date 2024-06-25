import React, { useState, useEffect } from 'react';
import userGuideData from './userGuide.json';

interface UserGuideItem {
  title: string;
  content: string;
}

const UserGuideComponents: React.FC = () => {
  const [guides, setGuides] = useState<UserGuideItem[]>([]);

  useEffect(() => {
    setGuides(userGuideData);
  }, []);

  return (
    <div className="container mx-auto p-4">
      {guides.map((guide, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-xl font-semibold mb-2">{guide.title}</h2>
          <p className="text-gray-700">{guide.content}</p>
        </div>
      ))}
    </div>
  );
};

export default UserGuideComponents;
