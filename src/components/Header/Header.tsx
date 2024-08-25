import { Link } from "react-router-dom";

import { Container, DesktopMenu, MenuBtn, MobileMenu } from "..";
import { useState } from "react";
import { MenuItems } from "../../types/global";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menu: MenuItems = [
    { label: "home", url: "/" },
    { label: "search", url: "/search" },
    { label: "login", url: "/login" },
    { label: "user profile", url: "/profile" },
  ];

  const handleMobileMenu = () => {
    setIsMobileMenuOpen((isOpen) => !isOpen);
  };

  const mobileNavStyles = isMobileMenuOpen
    ? "-translate-x-0 opacity-1"
    : "-translate-x-full opacity-0";

  return (
    <header className="md:py-0 border-b-[1px] border-black">
      <Container className="flex items-center justify-between gap-6">
        <Link to="/">
          <img src="/logo.svg" alt="talktube logo" className="w-28 md:w-32 lg:w-36" />
        </Link>
        <MenuBtn
          isActive={isMobileMenuOpen}
          onClick={handleMobileMenu}
          className="md:hidden -mr-4"
        />
        <DesktopMenu items={menu} />
        <MobileMenu
          className={`${mobileNavStyles} md:hidden`}
          items={menu}
          onClick={handleMobileMenu}
        />
      </Container>
    </header>
  );
}

export default Header;
