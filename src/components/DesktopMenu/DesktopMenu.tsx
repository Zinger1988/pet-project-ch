import React from "react";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../../helpers/stringUtils";
import { MenuItems } from "../../types/global";

interface DesktopMenuProps {
  className?: string;
  items: MenuItems;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ className = "", items }) => {
  const linkStyles = "font-bold transition-colors md:py-5 md:block lg:py-7 relative";

  const linkAfterStyles =
    "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-0 after:bg-yellow-400 after:transition-[width]";

  const linkHoverAfterStyles = "after:hover:w-full";

  return (
    <nav className="hidden md:block">
      <ul className="flex justify-center gap-12 ">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              to={item.url}
              className={`${linkStyles} ${linkAfterStyles} ${linkHoverAfterStyles}`}
            >
              {capitalizeFirstLetter(item.label)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopMenu;
