import { Link } from "react-router-dom";

import { Container, DesktopMenu, Logo, MenuBtn, MobileMenu } from "..";
import { useState } from "react";
import { useDarkThemeContext } from "../../context/DarkThemeContext";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function Header() {
  const { user } = useSelector((state: RootState) => state.authSlice);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark } = useDarkThemeContext();

  const handleMobileMenu = () => {
    setIsMobileMenuOpen((isOpen) => !isOpen);
  };

  const mobileNavStyles = isMobileMenuOpen
    ? "-translate-x-0 opacity-1"
    : "-translate-x-full opacity-0";

  return (
    <header className="md:py-0 border-b-[1px] border-black dark:border-gray-700 fixed w-full bg-white dark:bg-black z-50">
      <Container className="flex items-center justify-between gap-6">
        <Link to="/">
          <Logo className="w-40 lg:w-52" textColor={isDark ? "white" : "black"} />
        </Link>
        <MenuBtn
          isActive={isMobileMenuOpen}
          onClick={handleMobileMenu}
          className="md:hidden -mr-4"
        />
        <DesktopMenu user={user} />
        <MobileMenu
          className={`${mobileNavStyles} md:hidden`}
          onClick={handleMobileMenu}
          user={user}
        />
      </Container>
    </header>
  );
}

export default Header;
