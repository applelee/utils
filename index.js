import { createBrowserHistory } from 'history';
import {
  APP_NAME,
  PHONE_REGEX,
  EMAIL_REGEX,
  PERSON_ID,
} from './constants';

// 野生history
const history = createBrowserHistory();

/**
 * 
 * customHistory是History实例,只有一个push方法
 * @param {string} route 路由
 * @returns {object} History实例
 */
export const customHistory = (function (w) {
  const History = function () {};
  History.prototype.push = function (route) {
    history.push(route);
    w.location.reload();
  };
  return new History();
})(window);

/**
 * 
 * 手机号合法性校验
 * @param {string | number} phone 电话号码
 * @returns {boolean} 电话号码格式是否合法
 */
export const isPhone = phone => PHONE_REGEX.test(phone);

/**
 * 
 * 身份证合法性校验
 * @param {string | number} id 身份证号
 * @returns {boolean} 身份证号码格式是否合法
 */
export const isPersonID = id => PERSON_ID.test(id);

/**
 * 
 * 电子邮箱合法性校验
 * @param {string} email 电子邮箱
 * @returns {boolean} 电子邮箱格式是否合法
 */
export const isEmail = email => EMAIL_REGEX.test(email);

/**
 * 
 * 数据是否为空
 * @param {any} any 任意数据
 * @returns {boolean} 判断是否为空
 */
export const isEmpty = any =>{
  if (typeof any == 'undefined' || any == null || any === '') {
    return true;
  }
  return false;
};

/**
 * 
 * 获取缓存值
 * @param {string} key 缓存字段
 * @returns {any} 返回缓存数据
 */
export const getStorage = key => {
  const appStorage = getAppStorage();
  return appStorage[key];
};

/**
 * 
 * 设置缓存值
 * @param {string} key 缓存字段
 * @param {string} value 缓存值
 * @returns {void}
 */
export const setStorage = (key, value) => {
  const appStorage = getAppStorage();

  appStorage[key] = value;
  window.localStorage[APP_NAME] = JSON.stringify(appStorage);
};

/**
 * 
 * 删除缓存值
 * @param {string} key 缓存字段
 * @returns {void}
 */
export const deleteStorage = key => {
  const appStorage = getAppStorage();

  delete appStorage[key];
  window.localStorage[APP_NAME] = JSON.stringify(appStorage);
};

/**
 * 
 * 清除当前应用缓存
 * @returns {void} 这里有返回值但不需要关注
 */
export const clearStorage = () => {
  try {
    delete window.localStorage[APP_NAME];
  } catch (e) {};
};

/**
 * 
 * @returns {object} 返回当前应用的storage
 */
const getAppStorage = () => {
  let localData;

  try {
    localData = JSON.parse(window.localStorage[APP_NAME]);
    if (typeof localData !== 'object' || localData === null || Array.isArray(localData)) {
      localData = {};
    };
  } catch (e) {
    localData = {};
  };

  return localData;
};

/**
 * 
 * @returns {string} 返回客户端上午、中午、下午、早上、晚上
 */
export const getMeridiem = () => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  
  if (currentHour > 5 && currentHour < 8) {
    return '早上';
  } else if (currentHour < 11 || (currentHour === 11 && currentMinute < 30)) {
    return '上午';
  } else if (currentHour < 13 || (currentHour === 13 && currentMinute < 30)) {
    return '中午';
  } else if (currentHour < 18) {
    return '下午';
  } else {
    return '晚上';
  }
};

/**
 * 
 * 解析IM的时间
 * @param {number} date 时间戳
 * @returns {string} 返回结果
 */
export const parsingIMTime = date => {
  const beforeDate = new Date(date);
  const currentDate = new Date();
  const diffYear = currentDate.getFullYear() - beforeDate.getFullYear();
  const beforeYear = diffYear <= 0 ? '' : (diffYear === 1 ? '去年' : `${beforeDate.getFullYear()}年`);
  const diffDay = currentDate.getDate() - beforeDate.getDate();
  const beforeDay = diffDay <= 0 ? '今天' : (diffDay === 1 ? '昨天' : `${beforeDate.getMonth() + 1}月${beforeDate.getDate()}日`);
  const beforeHour = beforeDate.getHours();
  const beforeMinute = beforeDate.getMinutes();
  const beforeTime = `${beforeHour < 10 ? `0${beforeHour}` : beforeHour}:${beforeMinute < 10 ? `0${beforeMinute}` : beforeMinute}`;

  return `${beforeYear} ${beforeDay} ${beforeTime}`;
};

/**
 * 
 * 同步函数
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
 * 生成随机数(范围为2的30次幂)
 * @returns {number} number
 */
export const randomNum = () => {
  return (Math.random() * (1 << 30)) << 0;
};
