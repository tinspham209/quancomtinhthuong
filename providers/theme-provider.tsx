import {
  GlobalStyles,
  ThemeConfig,
  defaultTheme,
  getLocalTheme,
  setThemeLocalStorage,
} from '@/services/theme';
import { getThemeClasses } from '@/services/theme/global-class.config';
import { createContext, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';

export const ThemeContext = createContext<{
  theme: ThemeConfig;
  themeClasses: ThemeConfig;
  setLocalTheme: (theme: ThemeConfig) => void;
}>({ theme: defaultTheme, themeClasses: getThemeClasses(defaultTheme), setLocalTheme: () => {} });
export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(() => getLocalTheme());

  const themeClasses = useMemo(() => getThemeClasses(theme), [theme]);

  const setLocalTheme = (updatedTheme: ThemeConfig) => {
    setThemeLocalStorage(updatedTheme);
    setTheme(updatedTheme);
  };

  return (
    <ThemeContext.Provider value={{ setLocalTheme, theme, themeClasses }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
