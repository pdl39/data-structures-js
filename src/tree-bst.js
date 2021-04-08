// Implementing a Binary Search Tree

class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  // Average: T: O(logn) | S: O(1)
  // Worst: T: O(n) | S: O(1)
  traverseTo(value) {
    let currentNode = this;

    while (currentNode) {
      if (value === currentNode.value) return currentNode;
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return undefined;
  }

  // Average: T: O(logn) | S: O(1)
  // Worst: T: O(n) | S: O(1)
  traverseToParent(value) {
    if (this.value === value) return null;

    let currentNode = this;
    let parentNode;

    while (currentNode) {
      if (parentNode && value === parentNode.value) return parentNode;

      parentNode = currentNode;
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return undefined;
  }

  // Average: T: O(logn) | S: O(1)
  // Worst: T: O(n) | S: O(1)
  insert(value) {
    const newNode = new BST(value);
    let currentNode = this;
    let parentNode = currentNode;

    while (currentNode) {
      parentNode = currentNode;
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    if (value < parentNode.value) parentNode.left = newNode;
    else parentNode.right = newNode;

    return this;
  }

  // Average: T: O(logn) | S: O(1)
  // Worst: T: O(n) | S: O(1)
  contains(value) {
    let currentNode = this;
    while (currentNode) {
      if (value === currentNode.value) return true;
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return false;
  }

  // Average: T: O(logn) | S: O(1)
  // Worst: T: O(n) | S: O(1)
  remove(value, parentNode = null) {
    let currentNode = this;

    // search for the node with the given value.
    while (currentNode) {
      if (value < currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      }
      else if (value > currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      }
      else {
        break;
      }
    }

    // abandon if value not found.
    if (!currentNode) return this;

    const isRoot = !parentNode;
    // use a separate remove function if node to delete is the root.
    if (isRoot) return this.removeRoot(currentNode);

    // CASE1: node to delete has no children
    if (!this.hasChildren(currentNode)) {
      if (currentNode === parentNode.left) parentNode.left = null;
      if (currentNode === parentNode.right) parentNode.right = null;
    }
    // CASE2: node to delete has one child
    else if (
      this.hasOnlyLeftChild(currentNode) ||
      this.hasOnlyRightChild(currentNode)
    ) {
      if (currentNode === parentNode.left) {
        parentNode.left = currentNode.left
          ? currentNode.left
          : currentNode.right;
      } else {
        parentNode.right = currentNode.right
          ? currentNode.right
          : currentNode.left;
      }
    }
    // CASE3: node to delete has 2 children
    else {
      /* This involves replacing the value of the node (which was supposed to be deleted) 
      with the value of either 1) the biggest of its left side (in-order predecessor) or
      2) the smallest of its right side (in-order successor), and then deleting this node instead.
      Deleting this node involves calling the remove method on this node recursively.
      */
      // Choose to go with the left side or the right side based on which ever side's height is bigger.
      // This way, we can minimize the chance of creating an unbalanced tree.
      if (this.height(currentNode.left) > this.height(currentNode.right)) {
        return this.removeNodeInPre(currentNode);
      } 
      else {
        return this.removeNodeInSucc(currentNode);
      }
    }

    return this;
  }

  removeRoot(node) {
    if (!this.hasChildren(node)) return this;

    if (this.hasOnlyLeftChild(node)) {
      node.value = node.left.value;
      node.right = node.left.right;
      node.left = node.left.left;
    } 
    else if (this.hasOnlyRightChild(node)) {
      node.value = node.right.value;
      node.left = node.right.left;
      node.right = node.left.right;
    }
    else {
      if (this.height(node.left) > this.height(node.right)) {
        return this.removeNodeInPre(node);
      } 
      else {
        return this.removeNodeInSucc(node);
      }
    }

    return this;
  }

  removeNodeInPre(node) {
    if (!node) return undefined;

    let currentNode = node;
    let inpre = this.inorderPredecessor(currentNode.left);

    currentNode.value = inpre.value;
    currentNode.left.remove(currentNode.value, currentNode);

    return this;
  }

  removeNodeInSucc(node) {
    if (!node) return undefined;

    let currentNode = node;
    let insucc = this.inorderSuccessor(currentNode.right);

    currentNode.value = insucc.value;
    currentNode.right.remove(currentNode.value, currentNode);

    return this;
  }

  // returns the in-order predecessor of a node
  inorderPredecessor(node) {
    let inpre = node;
    while (inpre && inpre.right) {
      inpre = inpre.right;
    }
    
    return inpre;
  }
  
  // returns the in-order successor of a node
  inorderSuccessor(node) {
    let insucc = node;
    while (insucc && insucc.left) {
      insucc = insucc.left;
    }
    
    return insucc;
  }

  height(node) {
    if (!node) return 0;

    let x = this.height(node.left);
    let y = this.height(node.right);
    return x > y ? x + 1 : y + 1;
  }

  hasChildren(node) {
    return node.left || node.right;
  }

  hasOnlyLeftChild(node) {
    return node.left && !node.right;
  }

  hasOnlyRightChild(node) {
    return node.right && !node.left;
  }
}

const bst1 = new BST(10);

console.log(bst1.contains(8));
console.log(bst1.contains(10));
console.log(bst1.contains(11));
console.log(bst1.traverseTo(11));
console.log(bst1.traverseTo(10));
console.log(bst1.insert(12));
console.log(bst1.insert(11));
console.log(bst1.insert(15));
console.log(bst1.insert(13));
console.log(bst1.insert(5));
console.log(bst1.insert(20));
console.log(bst1.remove(12));
console.log(bst1.remove(10));
console.log(bst1.remove(19));

const bst2 = new BST(11);
console.log(bst2.insert(33));
console.log(bst2.insert(22));
console.log(bst2.contains(11));
console.log(bst2.contains(5));
console.log(bst2.contains(22));
console.log(bst2.remove(10));
console.log(bst2.remove(11));
console.log(bst2.remove(22));
console.log(bst2.contains(10));
console.log(bst2.contains(11));
console.log(bst2.contains(22));
