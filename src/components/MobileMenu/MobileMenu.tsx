import React from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import LangToggle from "../LangToggle/LangToggle";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/types";
import { signOut } from "../../store/actions/userActions";
import { IconId } from "../../types/enums";
import { User } from "firebase/auth";
import { NavLink } from "react-router-dom";
import Icon from "../Icon/Icon";
import { capitalizeFirstLetter } from "../../helpers/stringUtils";
import { useTranslation } from "react-i18next";

interface MobileMenuProps {
  className?: string;
  user: User | null;
  onClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ className = "", onClick, user }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const handleSignOut = () => {
    dispatch(signOut());
  };

  const navItems = [
    { label: t("mobile menu.explore"), url: "rooms/explore", icon: IconId.Compass },
    { label: t("mobile menu.my rooms"), url: "rooms", icon: IconId.Voice },
    { label: t("mobile menu.profile"), url: "profile", icon: IconId.Profile },
    { label: t("mobile menu.security"), url: "security", icon: IconId.Key },
    {
      label: t("mobile menu.notifications"),
      url: "notifications",
      icon: IconId.Notification,
    },
    { label: t("mobile menu.create room"), url: "rooms/create", icon: IconId.PlusCircle },
  ];

  const navStyles = `fixed left-0 top-16 bottom-0 w-full bg-black dark:border-t-[1px] dark:border-gray-700 transition-all duration-300 z-50 ${className}`;
  const navListItemStyles = "before:hidden m-0 mb-1.5 p-0  last:border-none";
  const navBaseLinkStyles =
    "flex items-center gap-4 px-4 py-3 no-underline font-semibold rounded-xl border-gray-700 transition-colors duration-300";
  const navLinkActiveStyles =
    "bg-primary-400 [&>svg]:fill-black text-black hover:text-black dark:hover:text-black";
  const navLinkNonActiveStyles =
    "hover:bg-gray-800 text-gray-300 dark:hover:bg-gray-700 hover:text-white";
  const iconStyles = "fill-gray-400 w-5 h-5 shrink-0";

  return (
    <nav className={navStyles} aria-label="Main navigation">
      <div className="flex flex-col justify-center items-center h-full gap-6">
        <LangToggle className="text-gray-300" />
        <ThemeToggle />
        {user && (
          <>
            <ul className="m-0 p-0">
              {navItems.map((item) => (
                <li key={item.url} className={navListItemStyles}>
                  <NavLink
                    end
                    onClick={onClick}
                    className={({ isActive }) =>
                      `${navBaseLinkStyles} ${
                        isActive ? navLinkActiveStyles : navLinkNonActiveStyles
                      }`
                    }
                    to={item.url}
                  >
                    <Icon id={item.icon} className={iconStyles} />
                    <span>{capitalizeFirstLetter(item.label)}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <Button
              onClick={handleSignOut}
              icon={IconId.Logout}
              appearance="outline"
              iconPosition="right"
              iconClassName="fill-white"
              className="text-white hover:text-white"
            >
              {t("header.logout")}
            </Button>
          </>
        )}
        {!user && (
          <>
            <Button
              onClick={onClick}
              to="/login"
              as="link"
              icon={IconId.Login}
              appearance="outline"
              iconPosition="right"
              iconClassName="fill-white"
              className="text-white hover:text-white"
            >
              {t("header.login")}
            </Button>
            <Button
              onClick={onClick}
              to="/registration"
              as="link"
              appearance="outline"
              className="text-white hover:text-white"
            >
              {t("header.register")}
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default MobileMenu;
