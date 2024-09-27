import { NavLink } from "react-router-dom";
import { IconId } from "../../types/enums";
import Icon from "../Icon/Icon";
import { capitalizeFirstLetter } from "../../helpers/stringUtils";
import Button from "../Button/Button";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = "" }) => {
  const navItems = [
    { label: "explore", url: "rooms/explore", icon: IconId.Compass },
    { label: "my rooms", url: "rooms", icon: IconId.Voice },
    { label: "profile", url: "profile", icon: IconId.Profile },
    { label: "security", url: "security", icon: IconId.Key },
    { label: "notifications", url: "notifications", icon: IconId.Notification },
    { label: "create room", url: "rooms/create", icon: IconId.PlusCircle },
  ];

  const navBaseLinkStyles =
    "flex items-center gap-4 px-5 py-4 no-underline font-semibold rounded-[1.1rem] border-gray-700 transition-colors duration-300";
  const navLinkActiveStyles =
    "bg-primary-400 [&>svg]:fill-black text-black hover:text-black dark:hover:text-black";
  const navLinkNonActiveStyles =
    "hover:bg-gray-800 text-gray-300 dark:hover:bg-gray-700 hover:text-white";

  return (
    <div className={`p-6 bg-gray-950 dark:bg-gray-800 rounded-3xl ${className}`}>
      <nav>
        <ul className="m-0 p-0">
          {navItems.map((item) => (
            <li
              key={item.label}
              className="before:hidden m-0 mb-1.5 p-0  last:border-none"
            >
              <NavLink
                end
                to={item.url}
                className={({ isActive }) =>
                  `${navBaseLinkStyles} ${
                    isActive ? navLinkActiveStyles : navLinkNonActiveStyles
                  }`
                }
              >
                <Icon id={item.icon} width="24" className="fill-gray-400" />
                <span>{capitalizeFirstLetter(item.label)}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
