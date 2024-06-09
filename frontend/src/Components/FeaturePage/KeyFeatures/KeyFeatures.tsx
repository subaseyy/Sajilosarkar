import React from 'react';

const features = [
  {
    title: 'Easy Reporting',
    description: 'Report infrastructure issues quickly and easily using our user-friendly platform.',
    icon: '📝',
  },
  {
    title: 'Real-time Tracking',
    description: 'Track the status of your reported issues in real-time and receive updates.',
    icon: '⏱️',
  },
  {
    title: 'Community Engagement',
    description: 'Engage with the community and local authorities to resolve issues collaboratively.',
    icon: '🤝',
  },
  // Add more features as needed
];

const KeyFeatures: React.FC = () => {
  return (
    <section className="key-features py-12 bg-white text-center">
      <h2 className="text-3xl font-bold mb-8">Key Features</h2>
      <div className="flex flex-wrap justify-center">
        {features.map((feature, index) => (
          <div key={index} className="feature mx-4 mb-8 text-center w-64">
            <div className="feature-icon text-6xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-md">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyFeatures;
