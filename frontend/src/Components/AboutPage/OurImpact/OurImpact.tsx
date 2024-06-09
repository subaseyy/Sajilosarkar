
const impactData = [
  {
    title: 'Reports Resolved',
    value: '1,234',
    description: 'Number of infrastructure issues successfully resolved.',
  },
  {
    title: 'Communities Served',
    value: '56',
    description: 'Number of communities that have benefited from our services.',
  },
  // Add more impact data as needed
];

const testimonials = [
  'Sajilo Sarkar has significantly improved our local infrastructure. - Community Member',
  'The platform is easy to use and very effective. - Local Official',
  // Add more testimonials as needed
];

const OurImpact: React.FC = () => {
  return (
    <section className="our-impact py-12 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-8">Our Impact</h2>
      <div className="impact-data flex flex-wrap justify-center mb-8">
        {impactData.map((item, index) => (
          <div key={index} className="impact-item mx-4 mb-4 text-center">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-3xl font-bold text-indigo-600">{item.value}</p>
            <p className="text-md mt-2">{item.description}</p>
          </div>
        ))}
      </div>
      <div className="testimonials">
        {testimonials.map((testimonial, index) => (
          <blockquote key={index} className="mb-4 text-lg italic">
            "{testimonial}"
          </blockquote>
        ))}
      </div>
    </section>
  );
};

export default OurImpact;
