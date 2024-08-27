import React from "react";
import { capitalizeFirstLetter } from "../../helpers/stringUtils";
import { MenuItems } from "../../types/global";
import { NavLink } from "react-router-dom";

interface MobileMenuProps {
  className?: string;
  items: MenuItems;
  onClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ className = "", items, onClick }) => {
  const navStyles = `fixed left-0 top-16 bottom-0 w-full bg-black transition-all duration-300 ${className}`;
  const listStyles = "flex flex-col justify-center h-full gap-6";
  const linkStyles =
    "font-black text-2xl uppercase text-white transition-colors hover:text-yellow-400";

  return (
    <nav className={navStyles} aria-label="Main navigation">
      <ul className={listStyles}>
        {items.map((item) => (
          <li key={item.label}>
            <NavLink
              onClick={onClick}
              to={item.url}
              className={({ isActive }) => {
                const activeClass = isActive ? "text-yellow-400" : "";
                return `${linkStyles} ${activeClass}`;
              }}
            >
              {capitalizeFirstLetter(item.label)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileMenu;
