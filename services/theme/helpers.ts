import { defaultTheme } from './default-theme';
import { ThemeConfig } from './types';

export const getLocalTheme = () => {
  if (typeof window !== 'undefined') {
    const themeLocalStorage = localStorage.getItem('theme');
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
