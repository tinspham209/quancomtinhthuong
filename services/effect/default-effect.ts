import { EffectConfig } from './types';

export const defaultEffects: EffectConfig = {
  // name: 'None',
  // enable: false,
  // config: [],

  name: 'TuyenTran',
  enable: true,
  config: [
    {
      content: '/tuyentran/tuyentran1.jpg',
      amount: 15,
      isImgUrl: true,
    },
    {
      content: '/tuyentran/tuyentran2.jpg',
      amount: 15,
      isImgUrl: true,
    },
    {
      content: '/tuyentran/tuyentran3.jpg',
      amount: 15,
      isImgUrl: true,
    },
    {
      content: 'Cầm nhầm đồ',
      amount: 4,
    },
  ],
};
