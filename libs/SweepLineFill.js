(function (w) {
  let options = {
    screenHeight: 100,
    pointers: [],
  }

  // 私有变量
  let screenHeight, pointers;
  let sweepRow = 0;
  let lineMap = new Map();
  let lineQueue = [];
  let lineRenderDatas = [];

  // 扫描线填充构造函数
  const SweepLineFill = function (opt = {}) {
    init(opt);
  }

  SweepLineFill.prototype.getSweepData = function () {
    createLineMap();
    sweepHandle();

    return lineRenderDatas;
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

    screenHeight = options.screenHeight;
    pointers = options.pointers;

    sweepRow = 0;
    lineMap = new Map();
    lineQueue = [];
  }

  // 扫描递归
  const sweepHandle = () => {
    if (sweepRow > screenHeight) return;

    inlineOperation();

    // setTimeout(() => {
    sweepRow += 1;
    sweepHandle();
    // });
  }

  // 行内检测
  const inlineOperation  = () => {
    const lineDatas = lineMap.get(sweepRow);

    deleteLineQueueMember();
    updateLineRenderDatas();

    // 是否有线段
    if (!lineDatas) return;

    // 取出数据后，立即从原表中删除
    lineMap.delete(sweepRow);
    insertLineQueue(lineDatas);
  }

  // 创建线段表
  const createLineMap = () => {
    const len = pointers.length;
    
    for (let i = 0; i < len; i ++) {
      const v1 = pointers[i];
      const v2 = pointers[i + 1 >= len ? 0 : i + 1];
      const tempLine = lineDirction(v1, v2);

      if (tempLine) {
        const tempData = lineMap.get(tempLine.sY) || [];

        lineMap.set(tempLine.sY, [
          ...tempData,
          tempLine,
        ]);
      }
    }
  }

  // 返回线段信息
  const lineDirction = (v1, v2) => {
    const [x1, y1] = v1;
    const [x2, y2] = v2;
    const slope = (y2 - y1) / (x2 - x1);

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

  // 删除线队列中的成员
  const deleteLineQueueMember = () => {
    lineQueue = lineQueue.filter(v => {
      return v.eY >= sweepRow;
    })
  }

  // 更新线段渲染数据
  const updateLineRenderDatas = () => {
    const len = lineQueue.length;
    let line = [];

    for (let i = 0; i < len; i ++) {
      const v = getFocus(lineQueue[i])
      // console.log(v);
      line.push(v);

      if ((i & 1) === 1 && line.length > 0) {
        lineRenderDatas.push(line);
        line = [];
      }
    }
  }

  // 插入到线段队列
  const insertLineQueue = a => {
    const len = a.length;
    
    for (let i = 0; i < len; i ++) {
      const lineLen = lineQueue.length;
      const o = a[i];

      if (lineLen === 0) {
        lineQueue.push(o);
        continue;
      }

      for (let j = 0; j < lineLen; j ++) {
        const lineO = lineQueue[j];

        if (lineO.sY > o.sY) {
          lineQueue.splice(j, 0, o);
          break;
        } else if (lineO.sY === o.sY) {
          if (lineO.sX >= o.sX) {
            lineQueue.splice(j, 0, o);
            break;
          }
        }

        if (j === lineLen - 1) {
          lineQueue.push(o);
        } 
      }
    }
  }
  
  // 获取焦点
  const getFocus = line => {
    const { slope, sX, sY } = line;

    if (slope === Infinity) return [sX, sweepRow];
    return [sX + (sweepRow - sY) / slope, sweepRow];
  }

  w.sweeplinefill = (opt = {}) => new SweepLineFill(opt);
})(window);