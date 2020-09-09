(function (w) {
  // 树总集
  let rootTree;

  // 空树构造函数
  const Tree = function () {
    // this.value;
    // this.leftTree;
    // this.rightTree;
  }

  /**
   * 
   * 二叉树构造函数
   * @param {array} array
   */
  const BinaryTree = function (array) {
    init(array);
  }

  BinaryTree.prototype = {
    // 树总集
    get rootTree () {
      return rootTree;
    }
  }
  
  // 插值
  BinaryTree.prototype.add = function (value) {
    addValue(value);
  }

  // 查询
  BinaryTree.prototype.has = function (value) {
    return hasValue(value);
  } 

  // 最小值
  BinaryTree.prototype.min = function () {
    return minTree().value;
  }

  // 最大值
  BinaryTree.prototype.max = function () {
    return maxTree().value;
  }

  // 删除
  BinaryTree.prototype.delete = function (value) {
    return deleteValue(value);
  }

  // 清空
  BinaryTree.prototype.clear = function () {
    rootTree = new Tree();
  }

  // 前序
  BinaryTree.prototype.preorderTraversal = function () {
    return preorderTraversalRecursion();
  }

  // 中序（升序）
  BinaryTree.prototype.inorderTraversalAsce = function () {
    return inorderTraversalAsceRecursion();
  }

  // 中序（降序）
  BinaryTree.prototype.inorderTraversalDesce = function () {
    return inorderTraversalDesceRecursion();
  }

  // 后序
  BinaryTree.prototype.postorderTraversal = function () {
    return postorderTraversalRecursion();
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
      return true;
    }
    tree.value = tempTree.value;
    return promotionTree(tempTree);
  }

  // 前序遍历
  const preorderTraversalRecursion = (tree = rootTree, result = []) => {
    if (tree.value !== undefined) result.push(tree.value);
    if (tree.leftTree) preorderTraversalRecursion(tree.leftTree, result);
    if (tree.rightTree) preorderTraversalRecursion(tree.rightTree, result);
    return result;
  }

  // 中序遍历（升序）
  const inorderTraversalAsceRecursion = (tree = rootTree, result = []) => {
    if (tree.leftTree) inorderTraversalAsceRecursion(tree.leftTree, result);
    if (tree.value !== undefined) result.push(tree.value);
    if (tree.rightTree) inorderTraversalAsceRecursion(tree.rightTree, result);
    return result
  }

  // 中序遍历（降序）
  const inorderTraversalDesceRecursion = (tree = rootTree, result = []) => {
    if (tree.rightTree) inorderTraversalDesceRecursion(tree.rightTree, result);
    if (tree.value !== undefined) result.push(tree.value);
    if (tree.leftTree) inorderTraversalDesceRecursion(tree.leftTree, result);
    return result
  }

  // 后序遍历
  const postorderTraversalRecursion = (tree = rootTree, result = []) => {
    if (tree.leftTree) postorderTraversalRecursion(tree.leftTree, result);
    if (tree.rightTree) postorderTraversalRecursion(tree.rightTree, result);
    if (tree.value !== undefined) result.push(tree.value);
    return result
  }

  w.bt = w.binarytree = (array = []) => new BinaryTree(array);
})(window);
