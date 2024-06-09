
const partners = [
  {
    name: 'Partner 1',
    logoSrc: '/path/to/partner-logo1.png',
    description: 'Partner 1 has been instrumental in supporting our project.',
  },
  {
    name: 'Partner 2',
    logoSrc: '/path/to/partner-logo2.png',
    description: 'Partner 2 provides valuable resources and expertise.',
  },
  // Add more partners as needed
];

const Partnerships: React.FC = () => {
  return (
    <section className="partnerships py-12 bg-white text-center">
      <h2 className="text-3xl font-bold mb-8">Partnerships</h2>
      <div className="partner-logos flex flex-wrap justify-center">
        {partners.map((partner, index) => (
          <div key={index} className="partner mx-4 mb-8 text-center">
            <img src={partner.logoSrc} alt={partner.name} className="partner-logo w-32 h-32 mx-auto mb-4" />
            <p className="text-md">{partner.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Partnerships;
