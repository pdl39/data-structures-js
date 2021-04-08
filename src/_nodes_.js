// Can use for a Singly Linked List:
export class NodeType1 {
  constructor(val=null) {
    this.value = val;
    this.next = null;
  }
}

// Can use for a Doubly Linked List:
export class NodeType2 {
  constructor(val=null) {
    this.value = val;
    this.prev = null;
    this.next = null;
  }
}

// Can use as a Tree Node with a list of all its descendants:
export class NodeType3 {
  constructor(val=null) {
    this.value = val;
    this.children = [];
  }
}

// Can use as a Tree Node with left and right child properties:
export class NodeType4 {
  constructor(val=null) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}

// Can use as a Graph Node:
export class NodeType5 {
  constructor(val=null) {
    this.value = val;
    this.adjacent = [];
    this.visited = false;
  }
}