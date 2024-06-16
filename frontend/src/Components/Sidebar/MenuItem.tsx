import React, { useState, ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface MenuItemProps {
  title: string;
  to?: string; // Optional prop for NavLink
  children?: ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, to, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Render a NavLink if 'to' prop is provided, otherwise render a button
  const menuItemContent = to ? (
    <NavLink
      to={to}
      className="w-full text-white text-left p-3 hover:bg-accent-2 block"
      onClick={() => setIsOpen(false)}
    >
      {title}
    </NavLink>
  ) : (
    <button
      className="w-full text-white text-left p-3 hover:bg-accent-2 block"
      onClick={() => setIsOpen(!isOpen)}
    >
      {title}
    </button>
  );

  return (
    <div>
      {menuItemContent}
      {isOpen && <div className="pl-4">{children}</div>}
    </div>
  );
};

export default MenuItem;
