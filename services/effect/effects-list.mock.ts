import { EffectConfig } from './types';

export const effectsList: Array<EffectConfig> = [
  {
    name: 'None',
    enable: false,
    config: [],
  },
  {
    name: 'Snow',
    enable: true,
    config: [
      {
        content: '❄️',
        amount: 1,
      },
      {
        content: '🍂',
        amount: 1,
      },
      {
        content: '💝',
        amount: 1,
      },
      {
        content: '🌟',
        amount: 1,
      },
      {
        content: '/snowflake.png',
        amount: 40,
        isImgUrl: true,
      },
    ],
  },
  {
    name: 'Dongky',
    enable: true,
    config: [
      {
        content: '/dongky/pic-1.png',
        amount: 3,
        isImgUrl: true,
      },
      {
        content: '/dongky/pic-2.png',
        amount: 3,
        isImgUrl: true,
      },
      {
        content: '/dongky/pic-3.png',
        amount: 3,
        isImgUrl: true,
      },
      {
        content: '/dongky/pic-4.png',
        amount: 3,
        isImgUrl: true,
      },
      {
        content: '/dongky/pic-5.png',
        amount: 3,
        isImgUrl: true,
      },
      {
        content: '/dongky/pic-6.png',
        amount: 3,
        isImgUrl: true,
      },
      {
        content: '/dongky/gif-1.gif',
        amount: 3,
        isImgUrl: true,
      },
      {
        content: '/dongky/gif-2.gif',
        amount: 3,
        isImgUrl: true,
      },
    ],
  },
];
