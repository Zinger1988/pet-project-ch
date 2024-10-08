import { Link } from 'react-router-dom';

import { Container, Logo } from '../components';
import { useState } from 'react';
import { useDarkThemeContext } from '../context/DarkThemeContext';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { DesktopMenu, MenuBtn, MobileMenu } from '../features/menu';

function Header() {
  const { user } = useSelector((state: RootState) => state.userSlice);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark } = useDarkThemeContext();

  const handleMobileMenu = () => {
    setIsMobileMenuOpen((isOpen) => !isOpen);
  };

  const mobileNavStyles = isMobileMenuOpen ? '-translate-x-0 opacity-1' : '-translate-x-full opacity-0';

  return (
    <header className='fixed z-50 w-full border-b-[1px] border-black bg-white dark:border-gray-700 dark:bg-black md:py-0'>
      <Container className='flex items-center justify-between gap-6'>
        <Link to='/'>
          <Logo className='w-40 lg:w-52' textColor={isDark ? 'white' : 'black'} />
        </Link>
        <MenuBtn isActive={isMobileMenuOpen} onClick={handleMobileMenu} className='-mr-4 md:hidden' />
        <DesktopMenu user={user} />
        <MobileMenu className={`${mobileNavStyles} md:hidden`} onClick={handleMobileMenu} user={user} />
      </Container>
    </header>
  );
}

export default Header;
