import { defaultTheme } from './default-theme';
import { ThemeConfig } from './types';

export const getLocalTheme = () => {
  if (typeof window !== 'undefined') {
    const themeLocalStorage = localStorage.getItem('theme');
    if (themeLocalStorage !== null) {
      try {
        const localTheme = JSON.parse(themeLocalStorage);
        return localTheme;
      } catch (error) {
        console.error(error);
      }
    }
    return defaultTheme;
  }
  return defaultTheme;
};

export const setThemeLocalStorage = (updatedTheme: ThemeConfig) => {
  localStorage.setItem('theme', JSON.stringify(updatedTheme));
};
