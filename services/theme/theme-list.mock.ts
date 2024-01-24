import { ThemeConfig } from './types';

export const themesList: Array<ThemeConfig> = [
  {
    name: 'Light',
    global: {
      common: {
        bgColor: '#fff',
        color: '#000',
        primaryBtnBgColor: '#000',
        primaryBtnColor: '#fff',
      },
      card: {
        bgColor: '#fff',
        color: '#000',
        borderRadius: 8,
      },
    },
    profile: {
      common: {
        bgColor: '#fff',
        color: '#000',
        primaryBtnBgColor: '#000',
        primaryBtnColor: '#fff',
      },
      card: {
        bgColor: '#fff',
        color: '#000',
        borderRadius: 8,
        titleColor: '#000',
        descriptionColor: '#000',
        borderWidth: 0,
        borderStyle: 'solid',
        borderColor: '#000',
      },
    },
  },
  {
    name: 'Dark',
    global: {
      common: {
        bgColor: '#1A1A1A',
        color: '#fff',
        primaryBtnBgColor: '#fff',
        primaryBtnColor: '#1A1A1A',
      },
      card: {
        bgColor: '#1A1A1A',
        color: '#fff',
        borderRadius: 8,
      },
    },
    profile: {
      common: {
        bgColor: '#1A1A1A',
        color: '#fff',
        primaryBtnBgColor: '#fff',
        primaryBtnColor: '#1A1A1A',
      },
      card: {
        bgColor: '#1A1A1A',
        color: '#fff',
        borderRadius: 8,
        titleColor: '#fff',
        descriptionColor: '#fff',
        borderWidth: 0,
        borderStyle: 'solid',
        borderColor: '#fff',
      },
    },
  },
  {
    name: 'Yahoo 360',
    global: {
      common: {
        bgColor: '#f7ea33',
        color: '#000801',
        primaryBtnBgColor: '#fff',
        primaryBtnColor: '#f72528',
      },
      card: {
        bgColor: '#f72528',
        color: '#fff',
        borderRadius: 8,
      },
    },
    profile: {
      common: {
        bgColor: '#f72528',
        color: '#fff',
        primaryBtnBgColor: '#fff',
        primaryBtnColor: '#f72528',
      },
      card: {
        bgColor: '#f72528',
        color: '#fffc25',
        borderRadius: 12,
        titleColor: '#06ff00',
        descriptionColor: '#ffee78',
        borderWidth: 5,
        borderStyle: 'dashed',
        borderColor: '#1ffc98',
      },
    },
  },
  {
    name: 'Xmas',
    global: {
      common: {
        bgColor: '#A6344B',
        color: '#FFF',
        primaryBtnBgColor: '#fff',
        primaryBtnColor: '#A6344B',
      },
      card: {
        bgColor: '#A6344B',
        color: '#fff',
        borderRadius: 8,
      },
    },
    profile: {
      common: {
        bgColor: '#A6344B',
        color: '#fff',
        primaryBtnBgColor: '#fff',
        primaryBtnColor: '#A6344B',
      },
      card: {
        bgColor: '#A6344B',
        color: '#fffc25',
        borderRadius: 12,
        titleColor: '#06ff00',
        descriptionColor: '#ffee78',
        borderWidth: 5,
        borderStyle: 'dashed',
        borderColor: '#1ffc98',
      },
    },
  },
];
