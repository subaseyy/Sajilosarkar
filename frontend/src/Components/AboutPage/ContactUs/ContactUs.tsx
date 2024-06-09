
const ContactUs: React.FC = () => {
  return (
    <section className="contact-us py-12 bg-white text-center">
      <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
      <p className="text-lg">Email: contact@sajilosarkar.com</p>
      <p className="text-lg">Phone: +123 456 7890</p>
      <div className="social-media-links flex justify-center mt-4">
        <a href="https://facebook.com/sajilosarkar" className="mx-2 text-blue-600">Facebook</a>
        <a href="https://twitter.com/sajilosarkar" className="mx-2 text-blue-400">Twitter</a>
        <a href="https://instagram.com/sajilosarkar" className="mx-2 text-pink-600">Instagram</a>
      </div>
    </section>
  );
};

export default ContactUs;
