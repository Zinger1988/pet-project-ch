import React from "react";

import { ThemeToggle, LangToggle, Button } from "..";

import { MenuItems, User } from "../../types/global";
import { useDispatch } from "react-redux";
import { userSignOut } from "../../store/actions/userActions";
import { AppDispatch } from "../../store/types";
import { IconId } from "../../types/enums";

interface DesktopMenuProps {
  className?: string;
  user: User | null;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ className = "", user }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = () => {
    dispatch(userSignOut());
  };

  const navStyles = `hidden md:flex md:items-center gap-8 ${className}`;

  return (
    <nav className={navStyles} aria-label="Main navigation">
      <LangToggle />
      <div className="flex gap-4 sm:min-h-[4rem] lg:min-h-[5rem] items-center">
        {user && (
          <Button
            variant="secondary"
            onClick={handleSignOut}
            size="sm"
            icon={IconId.Login}
            iconPosition="right"
          >
            Logout
          </Button>
        )}
        {!user && (
          <>
            <Button
              to="/login"
              as="link"
              size="sm"
              icon={IconId.Login}
              iconPosition="right"
            >
              Login
            </Button>
            <Button
              to="/registration"
              as="link"
              size="sm"
              appearance="outline"
              variant="secondary"
            >
              Register
            </Button>
          </>
        )}
      </div>
      <ThemeToggle />
    </nav>
  );
};

export default DesktopMenu;
