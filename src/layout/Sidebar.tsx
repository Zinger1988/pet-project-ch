import Icon from '../components/Icon';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { IconId } from '../types/enums';
import { capitalizeFirstLetter } from '../helpers/stringUtils';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const { notifications } = useSelector((state: RootState) => state.notificationsSlice);
  const hasNotifications = notifications !== null && notifications.length !== 0;
  const unreadNotificationsCount = hasNotifications
    ? notifications.reduce<number>((acc, cur) => (cur.hasBeenRead ? acc : acc + 1), 0)
    : 0;

  const navItems = [
    { label: t('mobile menu.explore'), url: 'rooms/explore', icon: IconId.Compass },
    { label: t('mobile menu.my rooms'), url: 'rooms', icon: IconId.Voice },
    { label: t('mobile menu.profile'), url: 'profile', icon: IconId.Profile },
    { label: t('mobile menu.security'), url: 'security', icon: IconId.Key },
    {
      label: t('mobile menu.notifications'),
      url: 'notifications',
      icon: IconId.Notification,
      counter: unreadNotificationsCount || null,
    },
    { label: t('mobile menu.create room'), url: 'rooms/create', icon: IconId.PlusCircle },
  ];

  const sidebarStyles = `p-3 bg-gray-950 dark:bg-gray-800 rounded-[1.3rem] lg:rounded-3xl lg:p-4 ${className}`;
  const navListStyles = 'm-0 p-0';
  const navListItemStyles = 'before:hidden m-0 mb-1.5 p-0  last:border-none';
  const navBaseLinkStyles =
    'flex items-center gap-4 px-4 py-3 lg:px-5 lg:py-4 no-underline font-semibold rounded-xl lg:rounded-[1.1rem] border-gray-700 transition-colors duration-300';
  const navLinkActiveStyles = 'bg-primary-400 [&>svg]:fill-black text-black hover:text-black dark:hover:text-black';
  const navLinkNonActiveStyles = 'hover:bg-gray-800 text-gray-300 dark:hover:bg-gray-700 hover:text-white';
  const iconStyles = 'fill-gray-400 w-5 h-5 lg:w-6 lg:h-6 shrink-0';
  const notificationsCountStyles =
    'text-body-xs ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white';

  return (
    <div className={sidebarStyles}>
      <nav>
        <ul className={navListStyles}>
          {navItems.map((item) => (
            <li key={item.label} className={navListItemStyles}>
              <NavLink
                end
                to={item.url}
                className={({ isActive }) =>
                  `${navBaseLinkStyles} ${isActive ? navLinkActiveStyles : navLinkNonActiveStyles}`
                }
              >
                <Icon id={item.icon} className={iconStyles} />
                <span>{capitalizeFirstLetter(item.label)}</span>
                {item.counter && <span className={notificationsCountStyles}>{item.counter}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
