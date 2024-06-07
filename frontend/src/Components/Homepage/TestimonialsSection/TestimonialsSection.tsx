import React from 'react';

interface Testimonial {
  id: number;
  name: string;
  image: string;
  quote: string;
}

const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'John Doe',
      image: 'https://via.placeholder.com/150', // Replace with actual image URL
      quote: 'Sajilo Sarkar has made reporting issues so convenient. I appreciate how quickly they respond to our concerns.'
    },
    {
      id: 2,
      name: 'Jane Smith',
      image: 'https://via.placeholder.com/150', // Replace with actual image URL
      quote: 'Using Sajilo Sarkar has saved me a lot of time. Their user-friendly interface makes it easy to navigate and submit reports.'
    },
    {
      id: 3,
      name: 'Michael Johnson',
      image: 'https://via.placeholder.com/150', // Replace with actual image URL
      quote: 'I\'ve been impressed with the efficiency of Sajilo Sarkar. They communicate effectively and ensure issues are resolved promptly.'
    },
  ];

  return (
    <section id="testimonials" className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">What Our Users Say</h2>
          <p className="text-gray-600 mt-2">Read testimonials from our satisfied users</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h3 className="text-lg font-bold">{testimonial.name}</h3>
                </div>
              </div>
              <p className="text-gray-700">{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
