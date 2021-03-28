// Implementing a stack with a linked list (singly).

class Node {
  constructor(val=null) {
    this.value = val;
    this.next = null;
  }
}

export default class StackLL {
  constructor(val=null) {
    this.top = val === null ? null : new Node(val);
    this.size = val === null ? 0 : 1;
  }

  showArray() {
    let currentNode = this.top;
    let array = [];

    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return array;
  }

  isEmpty() {
    return this.top === null;
  }

  peek() {
    return this.isEmpty() ? undefined : this.top.value;
  }

  // Adding to the top of the stack (the head of the linked list).
  // --> linkedlist.prepend()
  push(val) {
    const node = new Node(val);

    if (this.top === null) this.top = node;
    else {
      node.next = this.top;
      this.top = node;
    }
    this.size++;

    return this;
  }

  // Removing from the top of the stack (the head of the linked list).
    // --> linkedlist.deleteFirst()
  pop() {
    if (this.top === null) return undefined;

    let prevTop = this.top;
    this.top = prevTop.next;
    this.size--;

    return prevTop.value;
  }
}


//---------------------------------------------------------------------------------------
// EXAMPLE
const myStack = new StackLL();
console.log(myStack.peek());
console.log(myStack.isEmpty());
console.log(myStack.showArray());
myStack.push(5);
console.log(myStack.showArray());
myStack.push(6);
console.log(myStack.showArray());
myStack.push(7);
console.log(myStack.showArray());
myStack.push(8);
console.log(myStack.showArray());
myStack.push(9);
console.log(myStack.showArray());
console.log(myStack);
console.log("popped:", myStack.pop());
console.log(myStack.showArray());
console.log("popped:", myStack.pop());
console.log(myStack.showArray());
console.log("popped:", myStack.pop());
console.log(myStack.showArray());
console.log("popped:", myStack.pop());
console.log(myStack.showArray());
console.log("popped:", myStack.pop());
console.log(myStack.showArray());
console.log(myStack);
