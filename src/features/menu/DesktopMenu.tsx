import React from 'react';

import { ThemeToggle, LangToggle, Button } from '../../components';

import { useDispatch } from 'react-redux';
import { signOut } from '../../store/actions/userActions';
import { AppDispatch } from '../../store/types';
import { IconId } from '../../types/enums';
import { User } from 'firebase/auth';
import { useTranslation } from 'react-i18next';

interface DesktopMenuProps {
  className?: string;
  user: User | null;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ className = '', user }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const navStyles = `hidden md:flex md:items-center gap-8 ${className}`;

  return (
    <nav className={navStyles} aria-label='Main navigation'>
      <LangToggle />
      <div className='flex items-center gap-4 sm:min-h-[4rem] lg:min-h-[5rem]'>
        {user && (
          <Button variant='secondary' onClick={handleSignOut} size='sm' icon={IconId.Login} iconPosition='right'>
            {t('header.logout')}
          </Button>
        )}
        {!user && (
          <>
            <Button to='/login' as='link' size='sm' icon={IconId.Login} iconPosition='right'>
              {t('header.login')}
            </Button>
            <Button to='/registration' as='link' size='sm' appearance='outline' variant='secondary'>
              {t('header.register')}
            </Button>
          </>
        )}
      </div>
      <ThemeToggle />
    </nav>
  );
};

export default DesktopMenu;
