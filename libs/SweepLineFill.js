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

  SweepLineFill.prototype.fill = function () {
    fillHandle();
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
    sweepRow = height;
    lineMap = new Map();
  }

  const fillHandle = () => {
    if (sweepRow === 0) return;

    setTimeout(() => {
      sweepRow -= 1;
      console.log(sweepRow);
      fillHandle();
    })
  }

  // 创建线段表
  const createLineMap = () => {
    
  }

  // 矢量是否相等
  const isEqualVector = ([x1, y1], [x2, y2]) => {
    return x1 === x2 && y1 === y2;
  }

  w.sweeplinefill = (opt = {}) => new SweepLineFill(opt);
})(window);