import React, { useEffect, useState } from "react";
import {jwtDecode, JwtPayload } from "jwt-decode";
import NavImg from "../../../public/SajiloSarkar.svg";
import MenuItem from "./MenuItem"; 
import { NavLink, useNavigate } from "react-router-dom";

interface DecodedToken extends JwtPayload {
  username: string;
  sub: string;
}

const Sidebar: React.FC = () => {
  const token = localStorage.getItem("jwt-token");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token);
      setUsername(decodedToken.sub);
    }
  }, [token]);
  const handleLogout = () => {
    localStorage.removeItem('jwt-token');
    navigate('/login');
  };

  return (
    <div className="w-60 flex flex-col min-h-screen bg-accent-1">
      <div className="flex flex-col items-center mt-16 text-3xl font-extrabold">
        <NavLink to="/dashboard">
          <img src={NavImg} className="h-32 p-1" alt="Sajilo Sarkar Logo" />
        </NavLink>
        <NavLink to="/dashboard" className=" text-white flex items-center ml-2">
          Sajilo{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1">
            Sarkar
          </span>
        </NavLink>
      </div>
      <div className="flex mt-12 flex-col">
        <MenuItem title="Home" to="/dashboard" />
        <MenuItem title="Report an Issue">
          <MenuItem title="New Report" to="/dashboard/report-issue/new-issue" />
          <MenuItem title="My Reports" to="/dashboard/report-issue/report-list" />
        </MenuItem>
          <MenuItem title="Browse Issues">
            <MenuItem title="By Category" to="/issues/browse/category" />
            <MenuItem title="By Location" to="/issues/browse/location"  />
            <MenuItem title="By Status"  to="/issues/browse/status" />
          </MenuItem>
          


        <MenuItem title="Help & Support">
          <MenuItem title="FAQ" to="/faq" />
          <MenuItem title="Contact Us" to="/contact" />
          <MenuItem title="Accessibility Options" to="/accessibility" />
          <MenuItem title="User Guide" to="/user-guide" />
        </MenuItem>
        <MenuItem title="Account">
          <MenuItem title="Profile" to="/profile" />
          <MenuItem title="Settings" to="/settings" />
          <MenuItem title="Logout" onClick={handleLogout} />
        </MenuItem>
       
        <MenuItem title="Settings">
          <MenuItem title="System Settings" to="/settings/system" />
          <MenuItem title="Security Settings"  to="/settings/security"/>
          <MenuItem title="Language Preferences" to="/settings/language" />
        </MenuItem>


      </div>
      <div>
        <div className="text-white flex items-center justify-center mt-12 flex-col">
          <p> You are logged in as <br /> 
          <span className="font-bold"> {username} </span></p>
          <p className="text-xs">Sajilo Sarkar © 2022. All rights reserved.</p>
        </div>

      </div>
      </div>
  );
};

export default Sidebar;
