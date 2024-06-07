
const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row">
          {/* Left side (Illustration) */}
          <div className="lg:w-1/2">
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center lg:text-left">How it Works</h2>
              <div className="flex justify-center lg:justify-start space-x-6 mb-8">
                {/* Step 1 */}
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full text-white font-bold">1</div>
                <p className="text-gray-800">Take a picture of the issue.</p>
              </div>
              <div className="flex justify-center lg:justify-start space-x-6 mb-8">
                {/* Step 2 */}
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full text-white font-bold">2</div>
                <p className="text-gray-800">Describe the issue in a text bubble.</p>
              </div>
              <div className="flex justify-center lg:justify-start space-x-6">
                {/* Step 3 */}
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full text-white font-bold">3</div>
                <p className="text-gray-800">Submit the report.</p>
              </div>
            </div>
          </div>
          
          {/* Right side (Optional Video) */}
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/your-video-id"
                title="Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
