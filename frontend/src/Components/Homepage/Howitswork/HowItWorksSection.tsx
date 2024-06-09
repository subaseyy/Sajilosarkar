
const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center lg:flex-row">
          <div className="lg:w-1/2">
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center lg:text-left">How it Works</h2>
              <div className="flex justify-center lg:justify-start space-x-6 mb-8">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full text-white font-bold">1</div>
                <p className="text-gray-800">Take a picture of the issue.</p>
              </div>
              <div className="flex justify-center lg:justify-start space-x-6 mb-8">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full text-white font-bold">2</div>
                <p className="text-gray-800">Describe the issue in a text bubble.</p>
              </div>
              <div className="flex justify-center lg:justify-start space-x-6">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full text-white font-bold">3</div>
                <p className="text-gray-800">Submit the report.</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <div className=" aspect-video ">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/pH9ZCFy8ZUs?si=9q6gAKl2CiiI2f-Z"
                title="Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture web-share"
                referrerPolicy="strict-origin-when-cross-origin" 
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
