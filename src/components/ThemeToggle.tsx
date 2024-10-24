import Icon from './Icon';

import { IconId } from '../types/enums';
import { useDarkThemeContext } from '../context/DarkThemeContext';

const ThemeToggle = () => {
  const { isDark, handleDarkTheme } = useDarkThemeContext();

  const labelValue = `Switch to ${isDark ? 'light' : 'dark'} theme`;
  const btnStyles = 'relative flex rounded-xl bg-gray-400 dark:bg-gray-700';
  const highlightStyles = `absolute left-0 top-0 z-20 h-full w-1/2 rounded-xl bg-primary-400 transition-transform dark:translate-x-full`;
  const iconHolderStyles = 'relative z-20 p-2';
  const baseIconStyles = 'rounded-xl transition-colors';
  const lightIconStyles = 'fill-gray-900 dark:fill-white';
  const darkIconStyles = 'fill-gray-100 dark:fill-gray-900';

  return (
    <button className={btnStyles} aria-label={labelValue} onClick={handleDarkTheme}>
      <span className={highlightStyles}></span>
      <span className={iconHolderStyles}>
        <Icon id={IconId.Sun} width='20' className={`${baseIconStyles} ${lightIconStyles}`} />
      </span>
      <span className={iconHolderStyles}>
        <Icon id={IconId.Moon} width='20' className={`${baseIconStyles} ${darkIconStyles}`} />
      </span>
    </button>
  );
};

export default ThemeToggle;
