import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Container, Logo } from '../components';
import { DesktopMenu, MenuBtn, MobileMenu } from '../features/menu';

import { RootState } from '../store';
import { useDarkThemeContext } from '../context/DarkThemeContext';

function Header() {
  const { initialized, user } = useSelector((state: RootState) => state.userSlice);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark } = useDarkThemeContext();
  const handleMobileMenu = () => setIsMobileMenuOpen((isOpen) => !isOpen);

  const headerStyles = `fixed z-50 w-full border-b-[1px] border-black bg-white dark:border-gray-700 dark:bg-black md:py-0`;
  const containerStyles = 'flex items-center justify-between gap-6';
  const mobileNavStyles = `${isMobileMenuOpen ? '-translate-x-0 opacity-1' : '-translate-x-full opacity-0'} md:hidden`;
  const menuBtnStyles = '-mr-4 md:hidden';

  return (
    <header className={headerStyles}>
      <Container className={containerStyles}>
        <Link to='/'>
          <Logo className='w-40 lg:w-52' textColor={isDark ? 'white' : 'black'} />
        </Link>
        <MenuBtn isActive={isMobileMenuOpen} onClick={handleMobileMenu} className={menuBtnStyles} />
        {initialized && (
          <>
            <DesktopMenu user={user} />
            <MobileMenu user={user} className={mobileNavStyles} onClick={handleMobileMenu} />
          </>
        )}
      </Container>
    </header>
  );
}

export default Header;
