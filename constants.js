// content-type
export const APP_JSON = 'application/json';
export const FORM_URLENCODED = 'application/x-www-form-urlencoded';
export const FORM_DATA = 'multipart/form-data';

// regex
export const PHONE_REGEX = /^1([3-9])\d{9}$/;
export const EMAIL_REGEX = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
export const PERSON_ID = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
export const CONSOLE_REGEX = /^(console\.).+(\);|\))/;

// status
export const ACCESS = 'OK';
export const FAIL = 'FAIL';
export const AUTHENTICATED = 'AUTHENTICATED';
export const UNAUTHORIZED = 'UNAUTHORIZED';
export const EXCEPTION = 'EXCEPTION';
