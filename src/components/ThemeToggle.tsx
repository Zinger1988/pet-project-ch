import Icon from './Icon';

import { useDarkThemeContext } from '../context/DarkThemeContext';

import { IconId } from '../types/enums';

const ThemeToggle = () => {
  const { isDark, handleDarkTheme } = useDarkThemeContext();

  return (
    <button
      className='relative flex rounded-xl bg-gray-400 dark:bg-gray-700'
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      onClick={handleDarkTheme}
    >
      <span className='absolute left-0 top-0 z-20 h-full w-1/2 rounded-xl bg-primary-400 transition-transform dark:translate-x-full'></span>
      <span className='relative z-20 p-2'>
        <Icon id={IconId.Sun} width='20' className='rounded-xl fill-gray-900 transition-colors dark:fill-white' />
      </span>
      <span className='relative z-20 p-2'>
        <Icon id={IconId.Moon} width='20' className='rounded-md fill-gray-100 transition-colors dark:fill-gray-900' />
      </span>
    </button>
  );
};

export default ThemeToggle;
