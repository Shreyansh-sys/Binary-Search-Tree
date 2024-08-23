import { Tree } from './tree.js';
import { prettyPrint } from './tree.js';
// Generate a random array of numbers
const generateRandomArray = (size, max) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
};

// Create a tree
const randomArray = generateRandomArray(15, 100);
const tree = new Tree(randomArray);

console.log('Initial tree:');
prettyPrint(tree.root);
console.log('Is the tree balanced?', tree.isBalanced());

// Traverse the tree in different orders
console.log('Level order:');
tree.levelOrder(tree.root, (node) => console.log(node.data));

console.log('Pre order:');
tree.preOrder(tree.root, (node) => console.log(node.data));

console.log('In order:');
tree.inOrder(tree.root, (node) => console.log(node.data));

console.log('Post order:');
tree.postOrder(tree.root, (node) => console.log(node.data));

// Unbalance the tree
const largeValues = [101, 105, 110, 115, 120];
largeValues.forEach((value) => tree.insert(value));


console.log('Tree after inserting large values:');
prettyPrint(tree.root);
console.log('Is the tree balanced?', tree.isBalanced());

// Rebalance the tree
tree.rebalance();

console.log('Tree after rebalancing:');
prettyPrint(tree.root);
console.log('Is the tree balanced?', tree.isBalanced());

// Traverse the tree in different orders again
console.log('Level order:');
tree.levelOrder(tree.root, (node) => console.log(node.data));

console.log('Pre order:');
tree.preOrder(tree.root, (node) => console.log(node.data));

console.log('In order:');
tree.inOrder(tree.root, (node) => console.log(node.data));

console.log('Post order:');
tree.postOrder(tree.root, (node) => console.log(node.data));