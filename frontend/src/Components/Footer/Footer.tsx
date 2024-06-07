import NavImg from '../../../public/SajiloSarkar.svg';

const Footer = () => {
  return (
    <footer className="bg-slate-800">
      <div className="flex items-center mx-16 justify-between">
        <div className="w-1/3 mr-20">
          <div className="flex items-center text-white text-3xl font-extrabold mb-4">
            <a href="/">
              <img src={NavImg} className="h-20 p-2" alt="Sajilo Sarkar Logo" />
            </a>
            <a href="/">
              Sajilo 
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1">Sarkar</span>
            </a>
          </div>
          <p className="text-white">
            "Sajilo Sarkar" is envisioned as a transformative project aimed at enhancing the interaction between the government and its citizens, particularly in addressing infrastructure issues like potholes. In many instances, citizens find it challenging to report such issues due to the complex and time-consuming procedures involved. This project seeks to streamline this process by introducing an innovative web portal, which acts as a bridge facilitating seamless communication between the government and the public.
          </p>
        </div>
        <div className="w-1/6 mr-16">
          <h3 className="text-white font-bold mb-2">Important Links</h3>
          <ul className="text-white space-y-1">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/features">Our Features</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="w-1/6">
          <h3 className="text-white font-bold mb-2">Connect With Us</h3>
          <ul className="text-white space-y-1">
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="flex h-8 items-center justify-between bg-black text-white px-12 mt-8">
        <span>© 2024 Sajilo Sarkar</span>
        <div className="flex space-x-4">
          <a href="/terms" className="mx-1">Terms & Conditions</a>
          <a href="/privacy" className="mx-1">Privacy Policy</a>
          <a href="/cookie" className="mx-1">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
