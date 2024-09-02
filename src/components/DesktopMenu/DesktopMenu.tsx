import React from "react";
import { NavLink } from "react-router-dom";

import { ThemeToggle, LangToggle } from "..";

import { MenuItems } from "../../types/global";
import { capitalizeFirstLetter } from "../../helpers/stringUtils";

interface DesktopMenuProps {
  className?: string;
  items: MenuItems;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ className = "", items }) => {
  const navStyles = `hidden md:flex md:items-center gap-8 lg:gap-12 ${className}`;
  const listStyles = "flex justify-center gap-6 lg:gap-10 m-0 p-0";
  const linkStyles =
    "font-bold transition-colors md:py-5 md:block lg:py-7 relative text-inherit no-underline dark:hover:text-white";
  const linkHoverAfterStyles = "after:hover:w-full";
  const linkAfterStyles =
    "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-0 after:bg-yellow-400 after:transition-[width]";

  return (
    <nav className={navStyles} aria-label="Main navigation">
      <ul className={listStyles}>
        {items.map((item) => (
          <li key={item.label} className="pl-0 before:hidden m-0">
            <NavLink
              to={item.url}
              className={({ isActive }) => {
                const activeClass = isActive ? "after:w-full" : "";
                return `${linkStyles} ${linkAfterStyles} ${linkHoverAfterStyles} ${activeClass}`;
              }}
            >
              {capitalizeFirstLetter(item.label)}
            </NavLink>
          </li>
        ))}
      </ul>
      <LangToggle />
      <ThemeToggle />
    </nav>
  );
};

export default DesktopMenu;
