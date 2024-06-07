import React from 'react'

interface CalltoActionProps {
    aboutUsUrl: string;
    faqsUrl: string;
  }


const CalltoAction: React.FC<CalltoActionProps>  = ({ aboutUsUrl, faqsUrl }) => {
  return (
    <section id="additional-info" className="py-12 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Additional Information</h2>
        <p className="text-gray-600 mt-2">Learn more about our project and its impact</p>
      </div>
      <div className="max-w-3xl mx-auto">
        <p className="text-gray-700 leading-relaxed mb-6">
          Sajilo Sarkar aims to revolutionize how citizens report issues and interact with local government agencies. By providing a user-friendly platform, we empower communities to voice their concerns and facilitate quicker resolutions.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          For more details, please visit our <a href={aboutUsUrl} className="text-blue-500 underline">About Us</a> page. You can also explore our <a href={faqsUrl} className="text-blue-500 underline">FAQs</a> for answers to common questions.
        </p>
      </div>
    </div>
  </section>
  )
}

export default CalltoAction
