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
