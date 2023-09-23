import { defaultTheme } from './default-theme';
import { ThemeConfig } from './types';

export const getLocalTheme = () => {
  const themeLocalStorage = localStorage.getItem('theme');
  if (typeof window !== 'undefined') {
    if (themeLocalStorage !== null) {
      const localTheme = JSON.parse(themeLocalStorage);
      return localTheme;
    }
    return defaultTheme;
  }
  return defaultTheme;
};

export const setThemeLocalStorage = (updatedTheme: ThemeConfig) => {
  localStorage.setItem('theme', JSON.stringify(updatedTheme));
};
