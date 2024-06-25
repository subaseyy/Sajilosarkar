import React, { useState, useEffect } from 'react';
import faqData from './faq.json';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);

  useEffect(() => {
    setFaqs(faqData);
  }, []);

  return (
    <div className="container mx-auto p-4">
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
          <p className="text-gray-700">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
