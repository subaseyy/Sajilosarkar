import { NavLink } from "react-router-dom";
import NavImg from "../../../public/SajiloSarkar.svg";

const Sidebar = () => {
  return (
    <div className="w-64 flex flex-col min-h-screen bg-accent-1">
      <div className="flex flex-col items-center mt-16 text-3xl font-extrabold">
        <NavLink to="/">
          <img src={NavImg} className="h-32 p-1" alt="Sajilo Sarkar Logo" />
        </NavLink>
        <NavLink to="/" className=" text-white flex items-center ml-2">
          Sajilo{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1">
            Sarkar
          </span>
        </NavLink>
      </div>
      <div className="flex mt-12 flex-col">
        <ul className="w-full text-white text-2xl">
          <li className=" hover:bg-accent-2 hover:border-r-2 hover:border-white py-2">
            <NavLink
              to="/"
              className=" flex items-center justify-center nav-link "
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>{" "}
              &nbsp; Home
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default Sidebar;
