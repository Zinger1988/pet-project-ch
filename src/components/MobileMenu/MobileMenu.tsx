import React from "react";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../../helpers/stringUtils";
import { MenuItems } from "../../types/global";

interface MobileMenuProps {
  className?: string;
  items: MenuItems;
  onClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ className = "", items, onClick }) => {
  return (
    <nav
      className={`fixed left-0 top-16 bottom-0 w-full bg-black transition-all duration-300 ${className}`}
    >
      <ul className="flex flex-col justify-center h-full gap-6 ">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              onClick={onClick}
              to={item.url}
              className="font-black text-2xl uppercase text-white transition-colors hover:text-yellow-400"
            >
              {capitalizeFirstLetter(item.label)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileMenu;
