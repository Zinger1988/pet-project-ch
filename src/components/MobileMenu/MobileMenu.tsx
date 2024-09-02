import React from "react";
import { capitalizeFirstLetter } from "../../helpers/stringUtils";
import { MenuItems } from "../../types/global";
import { NavLink } from "react-router-dom";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import LangToggle from "../LangToggle/LangToggle";

interface MobileMenuProps {
  className?: string;
  items: MenuItems;
  onClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ className = "", items, onClick }) => {
  const navStyles = `fixed left-0 top-16 bottom-0 w-full bg-black dark:border-t-[1px] dark:border-gray-700 transition-all duration-300 z-50 ${className}`;
  const listStyles = "flex flex-col justify-center items-center gap-6 m-0 p-0";
  const listItemStyles = "before:hidden p-0";
  const linkStyles =
    "font-black text-2xl uppercase text-white transition-colors hover:text-yellow-400 no-underline";

  return (
    <nav className={navStyles} aria-label="Main navigation">
      <div className="flex flex-col justify-center items-center h-full gap-6">
        <LangToggle />
        <ThemeToggle />
        <ul className={listStyles}>
          {items.map((item) => (
            <li key={item.label} className={listItemStyles}>
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
      </div>
    </nav>
  );
};

export default MobileMenu;
