import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import NavImg from '../../../public/SajiloSarkar.svg';
import axios from 'axios';

// Define an interface that extends JwtPayload to include username
interface DecodedToken extends JwtPayload {
  username: string;
  sub: string;
}

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt-token');
    const name = localStorage.getItem('first-name');
    if (token) {
      setToken(token);
      setName(name);

      if (token.split('.').length === 3) {
        try {
          const decodedToken: DecodedToken = jwtDecode(token);
          setUsername(decodedToken.sub); 
        } catch (error) {
          console.error('Invalid token:', error);
          localStorage.removeItem('jwt-token');
        localStorage.removeItem('first-name');
          setToken(null);
          setUsername(null);
          setName(null);
        }
      } else {
        console.error('Invalid token format');
        localStorage.removeItem('jwt-token');
        localStorage.removeItem('first-name');
        setUsername(null);
      }
    }

  }, [token, name]); 

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem('jwt-token');
    localStorage.removeItem('first-name');
    setToken(null);
    setUsername(null);
    setName(null);
    navigate('/login');
  };

  return (
    <nav className="flex justify-around h-16 text-xl items-center bg-accent-1 text-white">
     
     <div className="flex items-center text-3xl font-extrabold">
        <NavLink to="/">
          <img src={NavImg} className="h-16 p-2" alt="Sajilo Sarkar Logo" />
        </NavLink>
        <NavLink to="/" className="flex items-center ml-2">
          Sajilo <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1">Sarkar</span>
        </NavLink>
      </div>
      <div>
        <ul className="flex">
          <li className="mx-2 py-1 px-4">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="mx-2 py-1 px-4">
            <NavLink to="/about" className="nav-link">
              About Us
            </NavLink>
          </li>
          <li className="mx-2 py-1 px-4">
            <NavLink to="/features" className="nav-link">
              Our Features
            </NavLink>
          </li>
          <li className="mx-2 py-1 px-4">
            <NavLink to="/contact" className="nav-link">
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        {token ? (
          <div className="relative flex items-center">
            <span className="px-4 text-base cursor-pointer" onClick={toggleDropdown}>
              Hi, { name || 'User'}
            </span>
            <div className="relative">
              <div className="cursor-pointer" onClick={toggleDropdown}>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <NavLink to="/login" className="px-4 text-base border rounded-full mx-1 py-1 hover:bg-accent-2">
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="px-4 text-base border rounded-full mx-1 py-1 bg-accent-2 hover:bg-accent-1"
            >
              SignUp
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
