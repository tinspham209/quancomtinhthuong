import Effects from '@/components/effects';
import { useEffectsStore } from '@/hooks/use-local-config';
import { useThemeStore } from '@/hooks/use-local-theme';
import { defaultEffects, setEffectsLocalStorage } from '@/services/effect';
import { GlobalStyles, ThemeConfig, defaultTheme, setThemeLocalStorage } from '@/services/theme';
import { getThemeClasses } from '@/services/theme/global-class.config';
import { createContext, useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';

export const ThemeContext = createContext<{
  theme: ThemeConfig;
  themeClasses: ThemeConfig;
  setLocalTheme: (theme: ThemeConfig) => void;
}>({ theme: defaultTheme, themeClasses: getThemeClasses(defaultTheme), setLocalTheme: () => {} });
export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, onSetTheme } = useThemeStore();
  const { effects } = useEffectsStore();

  const themeClasses = useMemo(() => getThemeClasses(theme), [theme]);

  const setLocalTheme = useCallback(
    (updatedTheme: ThemeConfig) => {
      setThemeLocalStorage(updatedTheme);
      onSetTheme(updatedTheme);
    },
    [onSetTheme],
  );

  useLayoutEffect(() => {
    setEffectsLocalStorage(defaultEffects);
    setLocalTheme(defaultTheme);
  }, [setLocalTheme]);

  return (
    <ThemeContext.Provider value={{ setLocalTheme, theme, themeClasses }}>
      <ThemeProvider theme={theme}>
        <Effects hide={!effects || !effects.enable || !effects.config} config={effects?.config} />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
