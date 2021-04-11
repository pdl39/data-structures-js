// Implementing a stack with an array.

export default class StackArr {
  constructor() {
    this.data = [];
  }

  get size() {
    return this.data.length;
  } 

  isEmpty() {
    return this.data.length === 0;
  }

  peek() {
    return this.data[this.data.length - 1];
  }

  push(val) {
    this.data.push(val);
    return this.data;
  }
  
  // Use pushNode instead of push in cases where the stack elements must be nodes instead of values.
  pushNode(val) {
    this.data.push(new Node(val));
    return this.data;
  }

  pop() {
    return this.data.pop();
  }
}

class Node {
  constructor(val=null) {
    this.value = val;
    this.next = null;
  }
}


//---------------------------------------------------------------------------------------
// EXAMPLE
const myStack = new StackArr();
console.log(myStack.isEmpty());
console.log(myStack.peek());
console.log(myStack.push(5));
console.log(myStack.push(6));
console.log(myStack.push(7));
console.log(myStack.push(8));
console.log(myStack.push(9));
console.log(myStack);
console.log("size:", myStack.size);
console.log("popped:", myStack.pop());
console.log("popped:", myStack.pop());
console.log("popped:", myStack.pop());
console.log("popped:", myStack.pop());
console.log("popped:", myStack.pop());
console.log(myStack);
console.log("size:", myStack.size);