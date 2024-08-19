import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import NavImg from '../../../public/SajiloSarkar.svg'; 
import { useAuth } from '../Context/AuthProvider';

const AdminNavbar: React.FC = () => {
  const { token, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const navigate = useNavigate();
  const name = localStorage.getItem('name');

  const handleLogout = () => {
    logOut();
    navigate('/login');
  }

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="flex justify-between h-16 items-center bg-gray-800 text-white px-4">
      {/* Logo Section */}
      <div className="flex items-center text-3xl font-extrabold">
        <NavLink to="/admin">
          <img src={NavImg} className="h-16 p-2" alt="Sajilo Sarkar Logo" />
        </NavLink>
        <NavLink to="/admin" className="ml-2">
          Admin
        </NavLink>
      </div>

      {/* Middle Menu Section */}
      <div>
        <ul className="flex space-x-6">
          <li>
            <NavLink to="/admin" className="nav-link">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/Scrape-requests" className="nav-link">
              Scrape Requests
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className="nav-link">
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/report-issue" className="nav-link">
              Reported Issues
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Profile Section */}
      <div>
        {token ? (
          <div className="relative flex items-center">
            <span className="px-4 text-base cursor-pointer" onClick={toggleDropdown}>
              Hi, {name || 'Admin'}
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
                    to="/admin/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit Profile
                  </NavLink>
                  <NavLink
                    to="/admin"
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
          <NavLink to="/login" className="px-4 text-base border rounded-full mx-1 py-1 hover:bg-gray-700">
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
