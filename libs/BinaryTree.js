(function (w) {
  let rootTree;

  const Tree = function () {
    // this.value;
    // this.leftTree;
    // this.rightTree;
  }

  /**
   * @param {array} array
   */
  const BinaryTree = function (array) {
    init(array);
  }

  /**
   * @param {array} array
   */
  BinaryTree.create = function (array) {
    return new BinaryTree(array);
  }

  BinaryTree.prototype = {
    get rootTree () {
      return rootTree;
    }
  }
  
  BinaryTree.prototype.add = function (value) {
    addValue(value);
  }

  BinaryTree.prototype.has = function (value) {
    return hasValue(value);
  } 

  BinaryTree.prototype.min = function () {
    return minValue().value;
  }

  BinaryTree.prototype.max = function () {
    return maxValue().value;
  }

  BinaryTree.prototype.delete = function (value) {
    rootTree = deleteValue(value);
  }

  BinaryTree.prototype.clear = function () {
    rootTree = new Tree();
  }

  const init = (array = []) => {
    rootTree = new Tree();
    array.forEach(v => addValue(v));
  }

  const addValue = (v, tree = rootTree) => {
    if (tree.value === undefined) {
      tree.value = v;
    } else if (v < tree.value) {
      if (tree.leftTree === undefined) {
        tree.leftTree = new Tree();
      }
      addValue(v, tree.leftTree);
    } else if (v > tree.value) {
      if (tree.rightTree === undefined) {
        tree.rightTree = new Tree();
      }
      addValue(v, tree.rightTree);
    }
  }

  const hasValue = (v, tree = rootTree) => {
    if (v === tree.value) return true;
    if (v < tree.value && tree.leftTree) return hasValue(v, tree.leftTree);
    else if (v > tree.value && tree.rightTree) return hasValue(v, tree.rightTree);
    return false;
  }

  const minValue = (tree = rootTree) => {
    if (tree.leftTree) {
      return minValue(tree.leftTree);
    }
    return tree;
  }

  const maxValue = (tree = rootTree) => {
    if (tree.rightTree) {
      return maxValue(tree.rightTree);
    }
    return tree;
  }

  const deleteValue = (v, tree = rootTree) => {
    if (v === tree.value) {
      let tempTree;
      if (tree.leftTree) {
        tempTree = findTree(v, tree.leftTree);
      } else if (tree.rightTree) {
        tempTree = findTree(v, tree.rightTree);
      } else {
        tree = {};
      }
      tree.value = tempTree.value;

      if (tempTree.leftTree) return deleteValue(tempTree.value, tempTree.leftTree);
      else if (tempTree.rightTree) return deleteValue(tempTree.value, tempTree.leftTree);

      return tree;
    }
    else if (v < tree.value && tree.leftTree) return deleteValue(v, tree.leftTree);
    else if (v > tree.value && tree.rightTree) return deleteValue(v, tree.rightTree);
  }

  const findTree = (v, tree = rootTree) => {
    if (v === tree.value) return tree;
    if (v < tree.value && tree.leftTree) return hasValue(v, tree.leftTree);
    else if (v > tree.value && tree.rightTree) return hasValue(v, tree.rightTree);
    return false;
  }

  w.BinaryTree = BinaryTree;
})(window)