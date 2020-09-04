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
    return minTree().value;
  }

  BinaryTree.prototype.max = function () {
    return maxTree().value;
  }

  BinaryTree.prototype.delete = function (value) {
    return deleteValue(value);
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

  const minTree = (tree = rootTree) => {
    if (tree.leftTree) {
      return minTree(tree.leftTree);
    }
    return tree;
  }

  const maxTree = (tree = rootTree) => {
    if (tree.rightTree) {
      return maxTree(tree.rightTree);
    }
    return tree;
  }

  const deleteValue = (v, tree = rootTree) => {
    if (v === tree.value) return promotionTree(tree);
    else if (v < tree.value && tree.leftTree) return deleteValue(v, tree.leftTree);
    else if (v > tree.value && tree.rightTree) return deleteValue(v, tree.rightTree);

    // 没有匹配到
    return false;
  }

  const promotionTree = tree => {
    let tempTree;

    if (tree.rightTree) {
      tempTree = minTree(tree.rightTree);
    } else if (tree.leftTree) {
      tempTree = minTree(tree.leftTree);
    } else {
      delete tree.value;
      console.log('ok');
      return true;
    }
    tree.value = tempTree.value;
    return promotionTree(tempTree);
  }

  w.BinaryTree = BinaryTree;
})(window);
