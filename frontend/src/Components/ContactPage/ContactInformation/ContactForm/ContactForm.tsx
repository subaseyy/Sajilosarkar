import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., send the form data to an API)
    console.log(formData);
  };

  return (
    <section className="contact-form py-12 bg-white text-center">
      <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-left text-lg mb-2" htmlFor="name">Name</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-left text-lg mb-2" htmlFor="email">Email</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-left text-lg mb-2" htmlFor="subject">Subject</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-left text-lg mb-2" htmlFor="message">Message</label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          type="submit"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
