import React from 'react';

const faqs = [
  {
    question: 'How do I report an issue?',
    answer: 'You can report an issue through our website or mobile app by filling out a simple form and providing details about the issue.'
  },
  {
    question: 'How long does it take to resolve an issue?',
    answer: 'The resolution time depends on the complexity of the issue, but we aim to address all reported issues as quickly as possible.'
  },
  // Add more FAQs as needed
];

const FAQSection: React.FC = () => {
  return (
    <section className="faq-section py-12 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto text-left">
        {faqs.map((faq, index) => (
          <div key={index} className="faq mb-6">
            <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
            <p className="text-md">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
