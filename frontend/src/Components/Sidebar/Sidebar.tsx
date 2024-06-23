import React  from "react";
import NavImg from "../../../public/SajiloSarkar.svg";
import MenuItem from "./MenuItem"; 
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth(); 

  
  function init() {
    logOut();
  }

  const handleLogout = () => {
    logOut();
    navigate("/login");
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
          <p> You are logged in as <br /> </p>
          <div className=" items-center justify-center my-3">
            {user ? (
              <div>
          <span className="font-bold"> {user?.name} </span>
          <button  className=" mx-2 bg-accent-2 p-2 rounded-full " onClick={handleLogout}><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z" fill="currentColor" fill-rule="evenodd" clipRule="evenodd"></path></svg></button>
              </div>
        ) : (
          <>
            {window.addEventListener("load", init)}
            <NavLink to="/login" className="mx-2 bg-accent-2 p-2 rounded-full">Login</NavLink>
          </>
            )}
          </div>
          <p className="text-xs">Sajilo Sarkar © 2022. All rights reserved.</p>
        </div>

      </div>
      </div>
  );
};

export default Sidebar;
