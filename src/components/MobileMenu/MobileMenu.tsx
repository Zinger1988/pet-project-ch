import React from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import LangToggle from "../LangToggle/LangToggle";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/types";
import { signOut } from "../../store/actions/userActions";
import { IconId } from "../../types/enums";
import { User } from "firebase/auth";

interface MobileMenuProps {
  className?: string;
  user: User | null;
  onClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ className = "", onClick, user }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const navStyles = `fixed left-0 top-16 bottom-0 w-full bg-black dark:border-t-[1px] dark:border-gray-700 transition-all duration-300 z-50 ${className}`;

  return (
    <nav className={navStyles} aria-label="Main navigation">
      <div className="flex flex-col justify-center items-center h-full gap-6">
        <LangToggle className="text-gray-300" />
        <ThemeToggle />
        {user && (
          <Button
            onClick={handleSignOut}
            icon={IconId.Logout}
            appearance="outline"
            iconPosition="right"
            iconClassName="fill-white"
            className="text-white hover:text-white"
          >
            Logout
          </Button>
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
              Login
            </Button>
            <Button
              onClick={onClick}
              to="/registration"
              as="link"
              appearance="outline"
              className="text-white hover:text-white"
            >
              Register
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default MobileMenu;
