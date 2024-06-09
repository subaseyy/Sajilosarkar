import React from 'react';

const teamMembers = [
  {
    name: 'John Doe',
    title: 'Project Manager',
    imageSrc: '/path/to/profile1.jpg',
    bio: 'John has over 10 years of experience in project management and is passionate about community development.'
  },
  {
    name: 'Jane Smith',
    title: 'Lead Developer',
    imageSrc: '/path/to/profile2.jpg',
    bio: 'Jane is a software engineer with a focus on building scalable solutions for social impact.'
  },
];

const TeamMember: React.FC = () => {
  return (
    <section className="team py-12 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-8">The Team</h2>
      <div className="flex flex-wrap justify-center">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member mx-4 mb-8 text-center">
            <img src={member.imageSrc} alt={member.name} className="team-member-image w-40 h-40 rounded-full mx-auto mb-4 shadow-lg" />
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-md">{member.title}</p>
            <p className="text-sm mt-2">{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamMember;
