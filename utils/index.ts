/* eslint-disable use-isnan */
export const isEmpty = (value: any): boolean =>
	value === undefined ||
	value === null ||
	Number.isNaN(value) ||
	(typeof value === "object" && Object.keys(value).length === 0) ||
	(typeof value === "string" && value === "") ||
	(Array.isArray(value) && value.length === 0);
