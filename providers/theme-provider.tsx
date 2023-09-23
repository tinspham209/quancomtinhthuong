import {
  GlobalStyles,
  ThemeConfig,
  defaultTheme,
  getLocalTheme,
  setThemeLocalStorage,
} from '@/services/theme';
import { createContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';

export const ThemeContext = createContext<{
  theme: ThemeConfig;
  setLocalTheme: (theme: ThemeConfig) => void;
}>({ theme: defaultTheme, setLocalTheme: () => {} });
export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(() => getLocalTheme());

  const setLocalTheme = (updatedTheme: ThemeConfig) => {
    setThemeLocalStorage(updatedTheme);
    setTheme(updatedTheme);
  };

  return (
    <ThemeContext.Provider value={{ setLocalTheme, theme }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
