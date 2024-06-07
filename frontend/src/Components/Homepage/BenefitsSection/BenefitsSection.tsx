
const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Benefits</h2>
          <p className="text-gray-600 mt-2">Discover the advantages of using our service</p>
        </div>
        <div className="flex flex-wrap justify-center -mx-4">
          {/* Benefit 1 */}
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="text-blue-500 rounded-full bg-blue-100 p-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mt-4">Faster Resolution</h3>
              <p className="text-gray-700 text-center mt-2">
                Report issues and track their progress efficiently.
              </p>
            </div>
          </div>
          {/* Benefit 2 */}
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="text-blue-500 rounded-full bg-blue-100 p-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mt-4">Efficient Communication</h3>
              <p className="text-gray-700 text-center mt-2">
                Seamlessly communicate with stakeholders and resolve issues faster.
              </p>
            </div>
          </div>
          {/* Benefit 3 */}
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="text-blue-500 rounded-full bg-blue-100 p-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mt-4">User-Friendly Interface</h3>
              <p className="text-gray-700 text-center mt-2">
                Navigate easily through our platform and submit reports effortlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
