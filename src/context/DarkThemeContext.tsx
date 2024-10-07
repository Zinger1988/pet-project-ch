import React, { ReactNode, useState, useEffect, useContext } from 'react';

const ThemeContext = React.createContext({
  isDark: false,
  handleDarkTheme: () => {},
});

interface DarkThemeContextProviderProps {
  children: ReactNode;
}

const DarkThemeContextProvider: React.FC<DarkThemeContextProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    let isDarkTheme = localStorage.darkTheme === 'true';

    if (!('darkTheme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDarkTheme = true;
    }

    document.body.classList.toggle('dark', isDarkTheme);
    setIsDark(isDarkTheme);
  }, []);

  const handleDarkTheme = () => {
    localStorage.setItem('darkTheme', JSON.stringify(!isDark));
    document.body.classList.toggle('dark', !isDark);
    setIsDark(!isDark);
  };

  return <ThemeContext.Provider value={{ isDark, handleDarkTheme }}>{children}</ThemeContext.Provider>;
};

export default DarkThemeContextProvider;

export const useDarkThemeContext = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('Looks like you use dark theme context outside provider');
  }

  return context;
};
