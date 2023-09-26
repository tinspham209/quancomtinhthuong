import { getLocalTheme } from './helpers';
import { ThemeConfig } from './types';

export const getThemeClasses = (theme: ThemeConfig = getLocalTheme()): ThemeConfig => {
  return {
    name: '',
    global: {
      common: {
        bgColor: `bg-[${theme.global?.common?.bgColor}]`,
        color: `text-[var(--commonColor)]`,
        primaryBtnBgColor: `bg-[${theme.global?.common?.primaryBtnBgColor}]`,
        primaryBtnColor: `text-[${theme.global?.common?.primaryBtnColor}]`,
      },
      card: {
        bgColor: `bg-[${theme.global?.card?.bgColor}]`,
        color: `text-[${theme.global?.card?.color}]`,
      },
    },
  };
};

export const GlobalClasses = getThemeClasses();
