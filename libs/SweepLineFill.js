(function (w) {
  let options = {
    screenSize: [100, 100],
    pointers: [[0, 0], [100, 0], [100, 100], [0, 100]],
  }

  // 私有变量
  let screenSize, pointers;
  let sweepRow = 0;
  let lineMap = new Map();

  // 扫描线填充构造函数
  const SweepLineFill = function (opt = {}) {
    init(opt);
  }

  SweepLineFill.prototype.getSweepData = function () {
    createLineMap();
    sweepHandle();
  }

  SweepLineFill.prototype.reset = function (opt = {}) {
    init(opt);
  }

  // 
  const init = (opt = {}) => {
    options = {
      ...options,
      ...opt,
    }

    screenSize = options.screenSize;
    pointers = options.pointers;

    const [, height] = screenSize;
    sweepRow = 0;
    lineMap = new Map();
  }

  // 扫描递归
  const sweepHandle = () => {
    const [, height] = screenSize;
    if (sweepRow >= height) return;

    setTimeout(() => {
      console.log(sweepRow);
      inlineDetection();

      // sweepRow += 1;
      // sweepHandle();
    })
  }

  // 行内检测
  const inlineDetection  = () => {
    const lineDatas = lineMap.get(sweepRow);
    if (!lineDatas) return;

    const values = Object.values(lineDatas);
    console.log(values);
  }

  // 创建线段表
  const createLineMap = () => {
    const len = pointers.length;
    
    for (let i = 0; i < len; i ++) {
      const v1 = pointers[i];
      const v2 = pointers[i + 1 >= len ? 0 : i + 1];
      const tempLine = lineDirction(v1, v2);

      if (tempLine) {
        const tempData = lineMap.get(tempLine.sY) || {};

        lineMap.set(tempLine.sY, {
          ...tempData,
          [vectorTransformString([tempLine.sX, tempLine.sY])]: tempLine,
        });
      }
    }
  }

  // 线段方向
  const lineDirction = (v1, v2) => {
    const [x1, y1] = v1;
    const [x2, y2] = v2;
    const slope = Math.abs((y2 - y1) / (x2 - x1));

    if (y1 > y2) return {
      slope,
      sX: x2,
      sY: y2,
      eY: y1,
    };
    else if(y2 > y1) return {
      slope,
      sX: x1,
      sY: y1,
      eY: y2,
    };
  };

  // 矢量是否相等
  const isEqualVector = ([x1, y1], [x2, y2]) => {
    return x1 === x2 && y1 === y2;
  }

  // 矢量转换成字符串
  const vectorTransformString = ([x, y]) => `${x}_${y}`;

  w.sweeplinefill = (opt = {}) => new SweepLineFill(opt);
})(window);