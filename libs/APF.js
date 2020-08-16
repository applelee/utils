(function (w) {
  const APF = function (opt = {}) {
    this.options = {
      isAsterisk: false,                // 是否开启 *
      startVector: [0, 0],              // 开始矢量
      endVector: [1, 1],                // 结束矢量
      screenMaxX: 1,                    // 场景最大横坐标
      screenMaxY: 1,                    // 场景最大纵坐标
      obstacles: [[1, 1]],              // 障碍矢量集合
      maxLoop: 1000,                    // 最大循环次数（防止死循环与内存溢出）
      ...opt,
    }

    // 十字检测
    this.cross = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    // * 检测
    this.asterisk = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]];
    // 路径分支栈（重点）
    this.branchs = [];
    // 已解决掉的矢量（重点）
    this.solve = new Set;
    // 结果（2维数组）
    this.resultRoute = [];
    // 已经循环的次数
    this.loopCount = 0;
  }

  // 初始化
  APF.prototype.__init__ = function (opt = {}) {
    this.options = {
      ...this.options,
      ...opt,
    }
    this.isAsterisk = this.options.isAsterisk;
    this.startVector = this.options.startVector;
    this.endVector = this.options.endVector;
    this.screenMaxX = this.options.screenMaxX;
    this.screenMaxY = this.options.screenMaxY;
    this.directions = this.__getDirections__();
    this.obstacles = new Set(this.options.obstacles.map(v => vectorTransformString(v)));
    this.solve = new Set([vectorTransformString(this.startVector)]);
    this.branchs = new Map;
    this.branchs.set(vectorTransformString(this.startVector), [this.startVector]);
    this.resultRoute = [];
    this.maxLoop = this.options.maxLoop;
    this.loopCount = 0;
  }

  // 获取路径
  APF.prototype.getRoute = function (opt = {}) {
    this.__init__(opt);
    this.__calculationRoute__();
    return this.__getOnceRoute__();
  }

  // 循环计算
  APF.prototype.__calculationRoute__ = function () {
    while (this.resultRoute.length < 1 && this.loopCount < this.maxLoop) {
      const branchs = new Map([...this.branchs]);
      branchs.forEach((v, k) => this.__onceHandle__(v, k));
      this.loopCount ++;
    }
  }

  // 一次路径探索处理
  APF.prototype.__onceHandle__ = function (value, key) {
    const route = [...value];
    const len = route.length;
    const vector = route[len - 1];

    // 当前路径进入死胡同
    if (len < 1) {
      this.branchs.delete(key);
      return;
    };

    const directions = this.directions;
    let nextVector;
    let prevDistance;

    // 方向矢量校验
    for (let i = 0; i < directions.length; i ++) {
      const newVector = [vector[0] + directions[i][0], vector[1] + directions[i][1]];

      // 检测场景溢出、已解决、障碍物
      if (this.__isOverflow__(newVector) || this.__isSolve__(newVector) || this.__isObstacle__(newVector)) continue;
      
      const distance = this.__getDistance__(newVector);
      if ((!prevDistance && prevDistance !== 0) || prevDistance > distance) {
        prevDistance = distance;
        nextVector = newVector;
      } else if (prevDistance === distance) {
        // 产生分支
        const newRoute = [...route];
        newRoute.push(newVector);
        this.solve.add(vectorTransformString(newVector));
        this.branchs.set(vectorTransformString(newVector), newRoute);
      }
    }

    // 下一步矢量校验失败
    if (!nextVector) route.pop();
    else {
      this.solve.add(vectorTransformString(nextVector));
      route.push(nextVector);
    }

    this.branchs.set(key, [...route]);
    // 当前路径是否到达终点
    if (nextVector && this.__isOver__(nextVector)) this.resultRoute.push(route);
  }

  // 重新计算方向集
  APF.prototype.__getDirections__ = function () {
    const seedDirections = [...(this.isAsterisk ? this.asterisk : this.cross)];
    let newDirection = [];

    while (seedDirections.length > 0) {
      const len = seedDirections.length;
      const randomNum = (Math.random() * 1859137) & (len - 1);

      newDirection = newDirection.concat(seedDirections.splice(randomNum, 1));
    }

    return newDirection;
  }

  // 随机获取一条已经完成的路径（最短路径，通常会有多条）
  APF.prototype.__getOnceRoute__ = function () {
    console.log(this.resultRoute.length)
    return this.resultRoute.length < 1 ? [] : this.resultRoute[((Math.random() * 957831) >> 0) % this.resultRoute.length];
  }

  // 计算距离
  APF.prototype.__getDistance__ = function (vector) {
    const x = Math.abs(this.endVector[0] - vector[0]);
    const y = Math.abs(this.endVector[1] - vector[1]);

    if (!this.isAsterisk) return Math.abs(x) + Math.abs(y);
    else return x >= y ? x : y;
  }
  
  // 是否为障碍
  APF.prototype.__isObstacle__ = function (vector) {
    return this.obstacles.has(vectorTransformString(vector));
  }

  // 是否已经解决
  APF.prototype.__isSolve__ = function (vector) {
    return this.solve.has(vectorTransformString(vector));
  }

  // 是否溢出场景
  APF.prototype.__isOverflow__ = function (vector) {
    const x = vector[0];
    const y = vector[1];

    if (x < 0 || y < 0 || x >= this.screenMaxX || y >= this.screenMaxY) return true;
    return false;
  }

  // 是否结束
  APF.prototype.__isOver__ = function (vector = []) {
    return this.endVector[0] === vector[0] && this.endVector[1] === vector[1];
  }

  // 矢量转换成字符串
  const vectorTransformString = vector => `${vector[0]}_${vector[1]}`;
  // 字符串转换矢量
  const stringTransformVector = s => {
    const vector = s.split('_');

    vector[0] = Number(vector[0]);
    vector[1] = Number(vector[1]);
    return vector;
  }

  w.APF = APF;
})(window)