import { getLocalTheme } from './helper';
import { ThemeConfig } from './types';

export const getThemeClasses = (theme: ThemeConfig = getLocalTheme()): ThemeConfig => {
  return {
    name: '',
    common: {
      bgColor: `bg-[${theme.common.bgColor}]`,
      color: `text-[${theme.common.color}]`,
      primaryBtnBgColor: `bg-[${theme.common.primaryBtnBgColor}]`,
      primaryBtnColor: `text-[${theme.common.primaryBtnColor}]`,
    },
    card: {
      bgColor: `bg-[${theme.card.bgColor}]`,
      color: `text-[${theme.card.color}]`,
    },
  };
};

export const GlobalClasses = getThemeClasses();
