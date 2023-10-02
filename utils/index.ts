import { v4 as uuidv4 } from 'uuid';

/* eslint-disable use-isnan */
export const isEmpty = (value: any): boolean =>
  value === undefined ||
  value === null ||
  Number.isNaN(value) ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value === '') ||
  (Array.isArray(value) && value.length === 0);

export const noImageUrl =
  'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg';

export const formatMoney = (value: number) => {
  return new Intl.NumberFormat().format(value);
};
export const stringify = (
  params: { [key: string]: number | string | string[] | boolean | any },
  excludeKey: string[] = [],
) => {
  let result = '';

  if (!params) return '';

  Object.keys(params).forEach((key) => {
    if (!isEmpty(params[`${key}`]) || excludeKey.includes(`${key}`)) {
      if (Array.isArray(params[`${key}`])) {
        let array = params[`${key}`] as string[];
        array.forEach((param: string) => {
          result += `&${key}=${encodeURIComponent(param)}`;
        });
      } else {
        result += `&${key}=${encodeURIComponent(params[`${key}`]?.toString())}`;
      }
    }
  });

  result = result.replace(/^&/, '');

  return result;
};

export const BOOMBOX_URL = 'https://boombox.quanantinhthuong.store/';

export const getRandomId = (): string => uuidv4();
