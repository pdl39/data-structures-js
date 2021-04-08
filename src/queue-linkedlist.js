// Implementing a queue with a linked list (singly).

class Node {
  constructor(val=null) {
    this.value = val;
    this.next = null;
  }
}

export default class Queue {
  constructor(val=null) {
    this.first = val === null ? null : new Node(val);
    this.last = this.first;
    this.size = val === null ? 0 : 1;
  }

  showArray() {
    let currentNode = this.first;
    let array = [];

    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }
    
    return array;
  }

  isEmpty() {
    return this.first === null;
  }

  peek() {
    return this.isEmpty() ? undefined : this.first.value;
  }

  // Adding to the end (last node) of the Queue (the tail of the linked list).
  // --> linkedlist.append()
  enqueue(val) {
    let node = new Node(val);

    if (this.first === null) {
      this.first = node;
      this.last = node;
    }
    else {
      this.last.next = node;
      this.last = node;
    }
    this.size++;

    return this;
  }

  // Removing from the beginning (first node) of the Queue (the head of the linked list).
  // --> linkedlist.deleteFirst()
  dequeue() {
    if (this.first === null) return undefined;

    let prevFirst = this.first;
    this.first = prevFirst.next;
    this.last = this.first === null ? null : this.last;
    this.size--;

    return prevFirst.value;
  }
}


// EXAMPLE
const myQueue = new Queue();
console.log(myQueue.peek());
console.log(myQueue.isEmpty());
console.log(myQueue.showArray());
myQueue.enqueue(5);
console.log(myQueue.showArray());
myQueue.enqueue(6);
console.log(myQueue.showArray());
myQueue.enqueue(7);
console.log(myQueue.showArray());
myQueue.enqueue(8);
console.log(myQueue.showArray());
myQueue.enqueue(9);
console.log(myQueue.showArray());
console.log(myQueue);
console.log("dequeued:", myQueue.dequeue());
console.log(myQueue.showArray());
console.log("dequeued:", myQueue.dequeue());
console.log(myQueue.showArray());
console.log("dequeued:", myQueue.dequeue());
console.log(myQueue.showArray());
console.log("dequeued:", myQueue.dequeue());
console.log(myQueue.showArray());
console.log("dequeued:", myQueue.dequeue());
console.log(myQueue.showArray());
console.log(myQueue);

