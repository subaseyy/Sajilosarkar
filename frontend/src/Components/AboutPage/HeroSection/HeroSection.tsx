
const HeroSection: React.FC = () => {
  return (
    <div className="hero-section bg-gray-200 py-12 text-center">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCUEgca46lAETpI4zUXh6TzVR0d-JaA0s9pA&s" alt="Sajilo Sarkar Team" className="mx-auto mb-4 rounded-lg shadow-lg" />
      <div className="hero-content">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-2 text-lg">Meet the team making a difference.</p>
      </div>
    </div>
  );
};

export default HeroSection;
