const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.bstroot = null;
  }

  root() {
    return this.bstroot;
  }

  add(data) {
    this.bstroot = addNode(this.bstroot, data);
    
    function addNode(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        node.left = addNode(node.left, data);
      } else {
        node.right = addNode(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    function searchNode(node, data) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      if (data > node.data) {
        return searchNode(node.right, data);
      } else {
        return searchNode(node.left, data);
      }
    }

    return searchNode(this.bstroot, data);
  }

  find(data) {
    function findNode(node, data) {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      if (data > node.data) {
        return findNode(node.right, data);
      } else {
        return findNode(node.left, data);
      }
    }

    return findNode(this.bstroot, data);
  }

  remove(data) {
    this.bstroot = removeNode(this.bstroot, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        if (!node.right && !node.left) {
          return null;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        if (!node.left) {
          node = node.right;
          return node
        }

        let minRightSide = node.right;
        while (minRightSide.left) {
          minRightSide = minRightSide.left;
        }

        node.data = minRightSide.data;

        node.right = removeNode(node.right, minRightSide.data);

        return node;
      }
    }
  }

  min() {
    if (!this.bstroot) {
      return;
    }

    let node = this.bstroot;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.bstroot) {
      return;
    }

    let node = this.bstroot;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};