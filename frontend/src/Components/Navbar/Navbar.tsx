import { NavLink } from 'react-router-dom';
import NavImg from '../../../public/SajiloSarkar.svg';

const Navbar = () => {
  return (
    <nav className="flex justify-around h-16 text-xl items-center bg-accent-1 text-white">
      <div className="flex items-center text-3xl font-extrabold">
        <NavLink to="/">
          <img src={NavImg} className="h-16 p-2" alt="Sajilo Sarkar Logo" />
        </NavLink>
        <NavLink to="/" className="flex items-center">
          Sajilo <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1">Sarkar</span>
        </NavLink>
      </div>
      <div>
        <ul className="flex">
          <li className="mx-2 py-1 px-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "border-transparent border-y-2 bg-accent-1 border-accent-2 rounded-sm cursor-pointer"
                  : "border-transparent border-y-2 hover:bg-accent-1 hover:border-y-2 hover:border-accent-2 rounded-sm cursor-pointer"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="mx-2 py-1 px-4">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "border-transparent border-y-2 bg-accent-1 border-accent-2 rounded-sm cursor-pointer"
                  : "border-transparent border-y-2 hover:bg-accent-1 hover:border-y-2 hover:border-accent-2 rounded-sm cursor-pointer"
              }
            >
              About Us
            </NavLink>
          </li>
          <li className="mx-2 py-1 px-4">
            <NavLink
              to="/features"
              className={({ isActive }) =>
                isActive
                  ? "border-transparent border-y-2 bg-accent-1 border-accent-2 rounded-sm cursor-pointer"
                  : "border-transparent border-y-2 hover:bg-accent-1 hover:border-y-2 hover:border-accent-2 rounded-sm cursor-pointer"
              }
            >
              Our Features
            </NavLink>
          </li>
          <li className="mx-2 py-1 px-4">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "border-transparent border-y-2 bg-accent-1 border-accent-2 rounded-sm cursor-pointer"
                  : "border-transparent border-y-2 hover:bg-accent-1 hover:border-y-2 hover:border-accent-2 rounded-sm cursor-pointer"
              }
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        <button className="px-4 text-base border rounded-full mx-1 py-1 hover:bg-accent-2" type="button">Login</button>
        <button className="px-4 text-base border rounded-full mx-1 py-1 bg-accent-2 hover:bg-accent-1" type="button">SignUp</button>
      </div>
    </nav>
  );
};

export default Navbar;
