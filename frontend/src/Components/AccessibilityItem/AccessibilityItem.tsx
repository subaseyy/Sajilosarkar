import React, { useState, useEffect } from 'react';
import accessibilityData from './accessibility.json';

interface AccessibilityItem {
  title: string;
  description: string;
}

const AccessibilityItem: React.FC = () => {
  const [accessibilities, setAccessibilities] = useState<AccessibilityItem[]>([]);

  useEffect(() => {
    setAccessibilities(accessibilityData);
  }, []);

  return (
    <div className="container mx-auto p-4">
      {accessibilities.map((accessibility, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-xl font-semibold mb-2">{accessibility.title}</h2>
          <p className="text-gray-700">{accessibility.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AccessibilityItem;
