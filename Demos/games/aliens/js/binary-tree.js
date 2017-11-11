/**
 * Create by Carpricorncd
 */
var BinaryTree = function () {

  // 构造函数
  function BinaryTree() {
    this.root = null;
  }

  // 节点
  var Node = function (key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.selected = false;
  }

  // 插入节点
  var insertNode = function (node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        insertNode(node.right, newNode);
      }
    }
  }

  BinaryTree.prototype.insert = function (key) {
    var newNode = new Node(key);
    if (this.root === null) {
      this.root = newNode;
    } else {
      insertNode(this.root, newNode);
    }
  }

  // 中序遍历
  var inOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      inOrderTraverseNode(node.left, callback);
      callback(node.key);
      inOrderTraverseNode(node.right, callback);
    }
  }

  BinaryTree.prototype.inOrderTraverse = function (callback) {
    inOrderTraverseNode(this.root, callback);
  }

  // 前序遍历
  var preOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      callback(node.key);
      preOrderTraverseNode(node.left, callback);
      preOrderTraverseNode(node.right, callback);
    }
  }

  BinaryTree.prototype.preOrderTraverse = function (callback) {
    preOrderTraverseNode(this.root, callback);
  }

  // 后序遍历
  var postOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      postOrderTraverseNode(node.left, callback);
      postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }

  BinaryTree.prototype.postOrderTraverse = function (callback) {
    postOrderTraverseNode(this.root, callback);
  }

  // 最小值节点查找
  var minNode = function (node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left;
      }
      return node;
    }
    return null;
  }

  BinaryTree.prototype.min = function () {
    return minNode(this.root);
  }

  // 最大值节点查找
  var maxNode = function (node) {
    if (node) {
      while (node && node.right !== null) {
        node = node.right;
      }
      return node;
    }
    return null;
  }

  BinaryTree.prototype.max = function () {
    return maxNode(this.root);
  }

  // 指定值查找
  var searchNode = function (node, key) {
    if (node === null) {
      return null;
    }

    if (key < node.key) {
      return searchNode(node.left, key);
    } else if (key > node.key) {
      return searchNode(node.right, key);
    } else {
      return node;
    }
  }

  BinaryTree.prototype.search = function (key) {
    return searchNode(this.root, key);
  }

  // 查找右子树的最小节点
  var findMinNode = function (node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left;
      }
      return node;
    }
    return null;
  }

  // 删除节点 *********************************************
  var removeNode = function (node, key) {
    if (node === null) {
      return null;
    }
    if (key < node.key) {
      node.left = removeNode(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = removeNode(node.right, key);
      return node;
    } else {
      // 删除叶子节点
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      // 删除非叶子节点，
      // 且只有左子树或只有右子树
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.right;
        return node;
      }
      // 删除的节点为同时含有左右子树的节点
      // 在右子树中去查找最小值节点
      var aux = findMinNode(node.right);
      // 将要删除的节点值，更新为最小值节点的值
      node.key = aux.key;
      // 删除值为aux.key的节点
      node.right = removeNode(node.right, aux.key);
      return node;
    }
  }

  BinaryTree.prototype.remove = function (key) {
    return removeNode(this.root, key);
  }

  // 更新节点选中状态
  BinaryTree.prototype.updateSelected = function (key, selected) {
    var node = this.search(key);
    if (node === null) return;
    node.selected = selected ? true : false;
  }

  return BinaryTree;
}();

