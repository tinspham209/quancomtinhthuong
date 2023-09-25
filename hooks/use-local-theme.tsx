import { ThemeConfig, ThemeProps, getLocalTheme, setThemeLocalStorage } from '@/services/theme';
import toast from 'react-hot-toast';
import { create } from 'zustand';

interface UseLocalThemeStore {
  theme: ThemeConfig;
  onSetTheme: (theme: ThemeConfig) => void;

  // Global
  onSetGlobalTheme: (globalTheme: ThemeConfig['global']) => void;
  onSetCommonGlobalTheme: (globalCommonTheme: Partial<ThemeProps>) => void;
  onSetCardGlobalTheme: (globalCardTheme: Partial<ThemeProps>) => void;

  // Profile
  onSetProfileTheme: (globalTheme: ThemeConfig['profile']) => void;
  onSetCommonProfileTheme: (profileCommonTheme: Partial<ThemeProps>) => void;
  onSetCardProfileTheme: (profileCardTheme: Partial<ThemeProps>) => void;
}

export const useThemeStore = create<UseLocalThemeStore>((set) => ({
  theme: getLocalTheme(),
  onSetTheme: (theme: ThemeConfig) => {
    set({ theme: theme });
    setThemeLocalStorage(theme);
    toast.success('Update theme successfully!');
  },

  // Global
  onSetGlobalTheme: (globalTheme: ThemeConfig['global']) =>
    set((state) => ({
      theme: {
        ...state.theme,
        global: globalTheme,
      },
    })),
  onSetCommonGlobalTheme: (globalCommonTheme: Partial<ThemeProps>) =>
    set((state) => ({
      theme: {
        ...state.theme,
        global: {
          ...state.theme.global,
          common: {
            ...state.theme.global?.common,
            ...globalCommonTheme,
          },
        },
      },
    })),
  onSetCardGlobalTheme: (globalCardTheme: Partial<ThemeProps>) =>
    set((state) => ({
      theme: {
        ...state.theme,
        global: {
          ...state.theme.global,
          card: {
            ...state.theme.global?.card,
            ...globalCardTheme,
          },
        },
      },
    })),

  // Profile
  onSetProfileTheme: (globalTheme: ThemeConfig['profile']) =>
    set((state) => ({
      theme: {
        ...state.theme,
        profile: globalTheme,
      },
    })),
  onSetCommonProfileTheme: (profileCommonTheme: Partial<ThemeProps>) =>
    set((state) => ({
      theme: {
        ...state.theme,
        profile: {
          ...state.theme.profile,
          common: {
            ...state.theme.profile?.common,
            ...profileCommonTheme,
          },
        },
      },
    })),
  onSetCardProfileTheme: (profileCardTheme: Partial<ThemeProps>) =>
    set((state) => ({
      theme: {
        ...state.theme,
        profile: {
          ...state.theme.profile,
          card: {
            ...state.theme.profile?.card,
            ...profileCardTheme,
          },
        },
      },
    })),
}));
