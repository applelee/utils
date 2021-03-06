/**
 * 
 * 缓动函数
 * @param {number} t 数字
 * @returns {number} 返回缓动值
 */
export const fade = t => {
  return t * t * t * (t * (t * 6 - 15) + 10);
};

/**
 * 
 * 返回斐波那契数列中的指定序列的值
 * @param {number} n 序列号,正整数
 * @param {object} o 对象
 * @returns {number} number
 */
const fibonacci = (n = 0, o = {}) => {
  if (n === 0 || n === 1) return 1;
  if (o[n]) return o[n];
  o[n] = fibonacci(n - 1, o) + fibonacci(n - 2, o);
  return o[n];
};

/**
 * 
 * 排列
 * @param {number} n 任意整数
 * @param {number} m 任意整数
 * @returns {number} number
 */
const Anm = (n = 0, m) => {
  if (m !== undefined) {
    m -= 1;
    if (m <= 0) return n;
  }
  if (n <= 1) return 1;
  return n * Anm(n - 1, m);
};

/**
 * 
 * 组合
 * @param {number} n 任意整数
 * @param {number} m 任意整数
 * @returns {number} number
 */
const Cnm = (n, m) => {
  return Anm(n, m) / Anm(m);
};

/**
 * 
 * 2d矩阵直角旋转
 * @param {array} matrix2d 2d矩阵（2维数组[[0,0]]）
 * @param {boolean} clockwise 是否顺时针
 * @returns {array} 2d矩阵（2维数组）
 */
const matirx2dRotation = (matrix2d, clockwise = true) => {
  const col = matrix2d[0].length;
  const row = matrix2d.length;
  const colMaxKey = col - 1;
  const rowMaxKey = row - 1;
  const newMatirx2d = [];

  for (let y = 0; y < col; y ++) {
    newMatirx2d[y] = [];
    for (let x = 0; x < row; x ++) {
      if (clockwise) {
        newMatirx2d[y].push(matrix2d[rowMaxKey - x][y]);
        continue;
      }
      newMatirx2d[y].push(matrix2d[x][colMaxKey - y]);
    }
  };
  return newMatirx2d;
};

/**
 * 
 * 绕Z轴2d矩阵
 * @param {number} angle 角度
 * @param {boolean} clockwise 是否顺时针
 * @returns {array} 2d矩阵（2维数组）
 */
const matrix2dZ = (angle, clockwise = true, move = [0, 0]) => {
  const radian = angle * Math.PI / 180;
  const cos = () => Math.abs(angle % 180) === 90 ? 0 : Math.cos(radian);
  const sin = () => Math.sin(radian);
  const [x, y] = move
  
  return [
    [cos(), clockwise ? -sin() : sin(), 0],
    [clockwise ? sin() : -sin(), cos(), 0],
    [x, y, 1],
  ];
};

/**
 * 
 * 点积运算
 * @param {array} v1 矢量
 * @param {array} v2 矢量
 * @returns {number} 点积 
 */
const dotProduct = (v1, v2) => {
  let num = v1.length;

  const loopFn = (dot = 0) => {
    num --;
    if (num < 0) return dot;
    return loopFn(dot + v1[num] * v2[num]);
  };
  return loopFn();
};

/**
 * 
 * 矩阵相乘
 * @param {array} matrix1 2d矩阵
 * @param {array} maxtix2d 2d矩阵
 * @returns {array} 新的矩阵
 */
const matrixMultiplication = (matrix1, matrix2) => {
  const row1 = matrix1.length;
  const row2 = matrix2.length;
  const col2 = matrix2[0].length;
  const newMatirx = [];

  for (let z = 0; z < row1; z ++) {
    newMatirx[z] = [];

    for (let x = 0; x < col2; x ++) {
      const tampVector = [];
      for (let y = 0; y < row2; y ++) {
        tampVector.push(matrix2[y][x]);
      }
      newMatirx[z].push(dotProduct(matrix1[z], tampVector));
    }
  }

  return newMatirx;
};
