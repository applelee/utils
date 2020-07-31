import {
  PHONE_REGEX,
  EMAIL_REGEX,
} from './constants';

/**
 * 
 * @param {function} generator 函数生成器
 * @returns {void}
 */
export const Co = generator => {
  const ge = generator();
  const geLoop = next => {
    !next.done && next.value.then(res => geLoop(ge.next(res)));
  };
  
  geLoop(ge.next());
};

/**
 * 
 * @param {number} phone 电话号码
 * @returns {boolean} 电话号码格式是否合法
 */
export const isPhone = phone => PHONE_REGEX.test(phone);

/**
 * 
 * @param {string} email 电子邮箱
 * @returns {boolean} 电子邮箱格式是否合法
 */
export const isEmail = email => EMAIL_REGEX.test(email);
