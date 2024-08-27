import React from "react";
import { NavLink } from "react-router-dom";
import { capitalizeFirstLetter } from "../../helpers/stringUtils";
import { MenuItems } from "../../types/global";

interface DesktopMenuProps {
  className?: string;
  items: MenuItems;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ className = "", items }) => {
  const linkStyles = "font-bold transition-colors md:py-5 md:block lg:py-7 relative";
  const linkHoverAfterStyles = "after:hover:w-full";
  const linkAfterStyles =
    "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-0 after:bg-yellow-400 after:transition-[width]";

  return (
    <nav className="hidden md:block" aria-label="Main navigation">
      <ul className="flex justify-center gap-12 ">
        {items.map((item) => (
          <li key={item.label}>
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
    </nav>
  );
};

export default DesktopMenu;
