import { Node } from "./node.js";

export class Tree {
  constructor(array) {
    const sortedArray = array.sort((a, b) => a - b);
    const uniqueNumbers = sortedArray.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    let start = 0;
    let end = uniqueNumbers.length - 1;
    this.root = this.buildTree(uniqueNumbers, start, end);
  }
  buildTree(array, start, end) {
    let mid = Math.floor((start + end) / 2);
    if (start > end) {
      return null;
    }
    const node = new Node(array[mid]);
    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }
  preOrder(root = this.root, callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }
    if (root == null) {
      return;
    }
    callback(root);
    this.preOrder(root.left, callback);
    this.preOrder(root.right, callback);
  }
  inOrder(root = this.root, callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }
    if (root == null) {
      return;
    }
    this.inOrder(root.left, callback);
    callback(root);
    this.inOrder(root.right, callback);
  }
  postOrder(root = this.root, callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }
    if (root == null) {
      return;
    }
    this.postOrder(root.left, callback);
    callback(root);
    this.postOrder(root.right, callback);
  }
  insert(value, node = this.root) {
    if (node === null) return new Node(value);
    if (root.data === value) {
      return root;
    }
    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }
    return node;
  }
  deleteItem(root = this.root, value) {
    if (root == null) {
      return root;
    }
    if (value < root.data) {
      root.left = this.deleteItem(root.left, value);
    } else if (value > root.data) {
      root.right = this.deleteItem(root.right, value);
    } else {
      if (root.left === null) {
        return root.right;
      }
      if (root.right === null) {
        return root.left;
      }
      let succ = this.getSuccessor(root);
      root.data = succ.data;
      root.right = this.deleteItem(root.right, succ.data);
    }
    return root;
  }
  getSuccessor(node) {
    node = node.right;
    while (node !== null && node.left !== null) {
      node = node.left;
    }
    return node;
  }
  find(root = this.root, value) {
    if (root.data === value || root.data === null) {
      return root;
    }
    if (value < root.data) {
      return this.find(root.left, value);
    } else {
      return this.find(root.right, value);
    }
  }
  levelOrder(root = this.root, callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }
    if (root === null) return;
    const queue = [];
    queue.push(root);
    while (queue.length > 0) {
      const currNode = queue.shift();
      callback(currNode);
      if (currNode.left !== null) {
        queue.push(currNode.left);
      }
      if (currNode.right !== null) {
        queue.push(currNode.right);
      }
    }
  }
  height(node) {
    if (node === null) {
      return -1;
    }
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }
  depth(root = this.root, node) {
    if (root === null) return -1;
    if (node === null) return -1;
    if (root.data === node.data) return 0;

    const leftDepth = this.depth(root.left, node);
    const rightDepth = this.depth(root.right, node);

    if (leftDepth >= 0) return leftDepth + 1; // Node found in the left subtree
    if (rightDepth >= 0) return rightDepth + 1; // Node found in the right subtree

    return -1;
  }
  isBalanced(root = this.root) {
    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);
    if (Math.abs(leftHeight - rightHeight) <= 1) {
      return true;
    }
    return false;
  }
  rebalance(root = this.root) {
    const sortedArray = [];
    this.inOrder(root, (node) => sortedArray.push(node.data));

    this.root = this.buildTree(sortedArray, 0, sortedArray.length - 1);
  }
}

export const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function printNode(node) {
  console.log(node.data);
}

// const tree1 = new Tree([1, 2, 3, 4, 5, 6]);
// prettyPrint(tree1.root);
// tree1.insert(tree1.root, 7);
// tree1.insert(tree1.root, 8);
// tree1.insert(tree1.root, 0);
// prettyPrint(tree1.root);
// tree1.deleteItem(tree1.root, 3);
// prettyPrint(tree1.root);
// tree1.preOrder(tree1.root, printNode);

// console.log("Height of the tree:", tree1.height(tree1.root));

// // Testing depth method
// const node1 = tree1.find(tree1.root, 1);
// console.log('Node to find:', node1);
// console.log('Depth of node 1:', tree1.depth(tree1.root, node1));

// const node7 = tree1.find(tree1.root, 7);
// console.log('Node to find:', node7);
// console.log('Depth of node 7:', tree1.depth(tree1.root, node7));

// console.log(tree1.isBalanced(tree1.root));
// tree1.rebalance(tree1.root);
// console.log(tree1.isBalanced(tree1.root));
