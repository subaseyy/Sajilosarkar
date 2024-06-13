import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; 
import NavImg from '../../../public/SajiloSarkar.svg';

const Navbar: React.FC = () => {
  const { isAuthenticated, username, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    logout();
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
        {isAuthenticated ? (
          <div className="relative">
            <button
              className="px-4 text-base border rounded-full mx-1 py-1 hover:bg-accent-2"
              onClick={toggleDropdown}
            >
              Howdy {username}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Edit Profile
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
        ) : (
          <>
            <NavLink to="/login" className="px-4 text-base border rounded-full mx-1 py-1 hover:bg-accent-2">
              Login
            </NavLink>
            <NavLink to="/signup" className="px-4 text-base border rounded-full mx-1 py-1 bg-accent-2 hover:bg-accent-1">
              SignUp
            </NavLink>
            <NavLink
            onClick={handleLogout}
            to="" className="px-4 text-base border rounded-full mx-1 py-1 bg-accent-2 hover:bg-accent-1">
              LogOut
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
