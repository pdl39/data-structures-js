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

// Can use as a Tree Node:
export class NodeType3 {
  constructor(val=null) {
    this.value = val;
    this.children = [];
  }
}