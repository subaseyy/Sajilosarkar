import React from 'react';

const testimonials = [
  {
    quote: 'Sajilo Sarkar has transformed how we report and resolve infrastructure issues in our community.',
    author: 'Community Member',
  },
  {
    quote: 'The platform is intuitive and very effective in getting problems fixed quickly.',
    author: 'Local Official',
  },
  // Add more testimonials as needed
];

const UserTestimonials: React.FC = () => {
  return (
    <section className="user-testimonials py-12 bg-white text-center">
      <h2 className="text-3xl font-bold mb-8">User Testimonials</h2>
      <div className="flex flex-wrap justify-center">
        {testimonials.map((testimonial, index) => (
          <blockquote key={index} className="testimonial mx-4 mb-8 text-center w-64">
            <p className="text-md italic mb-2">"{testimonial.quote}"</p>
            <p className="text-sm font-semibold">- {testimonial.author}</p>
          </blockquote>
        ))}
      </div>
    </section>
  );
};

export default UserTestimonials;
