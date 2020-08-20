(function (w) {
  // opt参数的属性仅限在options中
  const AStarPath = function (opt = {}) {
    this.options = {
      isAstar: false,                   // 是否开启 *
      startVector: [0, 0],              // 开始矢量
      endVector: [1, 1],                // 结束矢量
      screenSize: [1, 1],               // 场景大小 width height
      obstacles: [],                    // 障碍矢量集合
      maxLoop: 1000,                    // 最大循环次数（防止死循环与内存溢出）
      ...opt,
    }

    // 十字检测
    this.cross = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    // * 检测
    this.star = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]];
    // 路径分支栈（重点）
    this.branchs = [];
    // 已解决掉的矢量（重点）
    this.solve = new Set();
    // 结果（2维数组）
    this.resultRoute = [];
    // 已经循环的次数
    this.loopCount = 0;
    // 走入死胡同的分支
    this.deadBrach = new Set();
    // 获取path的回调
    this.pathCB = () => {};

    this.__init__(opt);
  }

  // 工厂函数
  AStarPath.create = function (opt = {}) {
    return new AStarPath(opt)
  }

  // 初始化
  AStarPath.prototype.__init__ = function (opt = {}) {
    const options = {
      ...this.options,
      ...opt,
    }

    this.isAstar = options.isAstar;
    this.startVector = options.startVector;
    this.endVector = options.endVector;
    this.screenSize = options.screenSize;
    this.directions = this.__getDirections__();
    this.obstacles = new Set(this.options.obstacles.map(v => vectorTransformString(v)));
    this.solve = new Set([vectorTransformString(this.startVector)]);
    this.branchs = new Map([[vectorTransformString(this.startVector), [this.startVector]]]);
    this.deadBrach = new Set();
    this.resultRoute = [];
    this.maxLoop = this.options.maxLoop;
    this.loopCount = 0;
  }

  // 循环计算
  AStarPath.prototype.__calculationPath__ = function () {
    while (this.resultRoute.length < 1 && this.loopCount < this.maxLoop) {
      const branchs = new Map([...this.branchs]);
      // branchs.forEach((v, k) => (!this.deadBrach.has(k) && this.__onceHandle__(v, k)));
      branchs.forEach((v, k) => this.__onceHandle__(v, k));
      this.loopCount ++;
    }
  }

  // 一次路径探索处理
  AStarPath.prototype.__onceHandle__ = function (value, key) {
    const route = [...value];
    const len = route.length;
    const vector = route[len - 1];
    const directions = this.directions;
    const nextVectors = [];

    // 当前路径是否到达终点
    if (this.__isOver__(vector)) {
      this.resultRoute.push([...route]);
      return;
    }

    // 方向矢量校验
    for (let i = 0; i < directions.length; i ++) {
      const newVector = [vector[0] + directions[i][0], vector[1] + directions[i][1]];

      // 检测场景溢出、已解决、障碍物
      if (this.__isOverflow__(newVector) || this.__isSolve__(newVector) || this.__isObstacle__(newVector)) continue;

      nextVectors.push(newVector);
    }

    // 宣告此分支无解
    if (nextVectors.length < 1) {
      this.branchs.delete(key);
      // this.deadBrach.add(key);
      return
    };

    // 生成分支
    nextVectors.forEach((v, i) => {
      const newRoute = [...route];
      const newKey = vectorTransformString(v);
      newRoute.push(v);
      this.solve.add(newKey);
      this.branchs.set(i === 0 ? key : newKey, newRoute);
    });
  }

  // 重新计算方向集
  AStarPath.prototype.__getDirections__ = function () {
    const seedDirections = [...(this.isAstar ? this.star : this.cross)];
    let newDirection = [];

    while (seedDirections.length > 0) {
      const len = seedDirections.length;
      const randomNum = (Math.random() * 1859137) & (len - 1);
      newDirection = newDirection.concat(seedDirections.splice(randomNum, 1));
    }
    return newDirection;
  }

  // 随机获取一条已经完成的路径（最短路径，通常会有多条）
  AStarPath.prototype.__getOncePath__ = function () {
    return this.resultRoute.length < 1 ? [] : this.resultRoute[((Math.random() * 957831) >> 0) % this.resultRoute.length];
  }
  
  // 是否为障碍
  AStarPath.prototype.__isObstacle__ = function (vector) {
    return this.obstacles.has(vectorTransformString(vector));
  }

  // 是否已经解决
  AStarPath.prototype.__isSolve__ = function (vector) {
    return this.solve.has(vectorTransformString(vector));
  }

  // 是否溢出场景
  AStarPath.prototype.__isOverflow__ = function ([x, y]) {
    const [X, Y] = this.screenSize;
    if (x < 0 || y < 0 || x >= X || y >= Y) return true;
    return false;
  }

  // 是否结束
  AStarPath.prototype.__isOver__ = function (vector = []) {
    return this.endVector[0] === vector[0] && this.endVector[1] === vector[1];
  }

  // 运行
  AStarPath.prototype.run = function (opt = {}) {
    this.__init__(opt);
    this.__calculationPath__();
    this.pathCB();
  }

  // 直接获取路径
  AStarPath.prototype.getPath = function (opt = {}) {
    this.__init__(opt);
    this.__calculationPath__();
    return this.__getOncePath__();
  }

  // 获取路径同时有更多数据
  AStarPath.prototype.onPath = function (cb) {
    this.pathCB = () => cb({
      path: this.__getOncePath__(),
      solve: [...this.solve].map(v => stringTransformVector(v)),
      branchs: this.branchs,
    });
  }

  // 矢量转换成字符串
  const vectorTransformString = vector => `${vector[0]}_${vector[1]}`;
  // 字符串转还原成矢量
  const stringTransformVector = str => {
    const [x, y] = str.split('_');
    return [Number(x), Number(y)];
  };

  w.AStarPath = AStarPath;
})(window)