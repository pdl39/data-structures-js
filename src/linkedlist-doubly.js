// implementing linked list

class Node {
  constructor(val) {
    this.value = val;
    this.prev = null;
    this.next = null;
  }
}

export default class LinkedListD {
  constructor(val) {
    this.head = new Node(val);
    this.tail = this.head;
    this.length = 1;
  }

  length() {
    return this.length;
  }

  // Show the linked list as a simple array of node values.
  showArray() {
    let currentNode = this.head;
    let array = [];
    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return array;
  }

  // Show the linked list in the form of an array of maps. 
  /* Each map element corresponds to a node.
  It shows the node's next and prev nodes and whether it is the head, tail, or neither. */
  showDetailedArray() {
    let currentNode = this.head;
    let detailedArray = [];
    while (currentNode !== null) {
      detailedArray.push(new Map([
        [currentNode.value,
        {
          "next": currentNode.next ? currentNode.next.value : currentNode.next, 
          "prev": currentNode.prev ? currentNode.prev.value : currentNode.prev, 
          "head?": currentNode === this.head, 
          "tail?": currentNode === this.tail
        }]
      ]));
      currentNode = currentNode.next;
    }
    return detailedArray;
  }

  traverseTo(val) { // O(n)
    let currentNode = this.head;

    while (currentNode.value !== val) {
      currentNode = currentNode.next;
      if (currentNode === null) break;
    }

    return currentNode || undefined;
  }

  append(val) { // O(1) given information on the tail node.
    let prevTail = this.tail;
    let newTail = new Node(val);
    prevTail.next = newTail;
    newTail.prev = prevTail;
    this.tail = prevTail.next;
    this.length++;
    return this;
  }

  prepend(val) { // O(1)
    let prevHead = this.head;
    let newHead = new Node(val);
    newHead.next = prevHead;
    prevHead.prev = newHead;
    this.head = newHead;
    this.length++;
    return this;
  }

  insertValAfter(val, targetVal) { // O(n)
    let newNode = new Node(val);
    let currentNode = this.head;
    while (currentNode.next !== null) {
      if (currentNode.value === targetVal) break;
      currentNode = currentNode.next;
    }
    
    // if the node to insert after doesn't exist, return undefined.
    if (currentNode === this.tail && currentNode.value !== targetVal) return undefined;
    // if the node to insert after is the tail, call the append() method.
    if (currentNode === this.tail && currentNode.value === targetVal) return this.append(val);
    
    newNode.next = currentNode.next;
    newNode.next.prev = newNode;
    currentNode.next = newNode;
    newNode.prev = currentNode;
    this.length++;

    return this;
  }

  deleteFirst() { // O(1)
    let prevHead = this.head;
    this.head = prevHead.next;
    this.head.prev = null;
    this.length--;
    return prevHead;
  }

  deleteLast() { // O(1) given information on the tail node.
    let prevTail = this.tail;
    this.tail = prevTail.prev;
    this.tail.next = null;
    this.length--;
    return prevTail;
  }

  delete(val) { // O(n)
    let currentNode = this.head;

    // if node to delete is the head, call the deleteFirst() method.
    if (currentNode.value === val) return this.deleteFirst();

    while (currentNode.next.next !== null) {
      if (currentNode.next.value === val) break;
      currentNode = currentNode.next;
    }

    // if node to delete doesn't exist, return undefined.
    if (currentNode.next === this.tail && currentNode.next.value !== val) return undefined;
    // if node to delete is the tail, call the deleteLast() method.
    if (currentNode.next === this.tail && currentNode.next.value === val) return this.deleteLast();
  
    // if node to delete is a middle node, do the following:
    let confirmDeleteVal = currentNode.next.value === val;
    let nodeToDelete = confirmDeleteVal ? currentNode.next : undefined;
    currentNode.next = currentNode.next.next;
    currentNode.next.prev = currentNode;
    this.length--;
    
    return nodeToDelete;
  }
}


//---------------------------------------------------------------------------------------
// EXAMPLE
const dll = new LinkedListD(5);
console.log(dll);

dll.append(10);
console.log(dll);
console.log(dll.showArray());


dll.append(15);
console.log(dll);
console.log(dll.showArray());


dll.prepend(55);
console.log(dll);
console.log(dll.showArray());


dll.append(8);
console.log(dll);
console.log(dll.showArray());


dll.append(11);
console.log(dll);
console.log(dll.showArray());


dll.deleteFirst();
console.log(dll);
console.log(dll.showArray());


dll.deleteLast();
console.log(dll);
console.log(dll.showArray());

dll.insertValAfter(22, 10);
console.log(dll);
console.log(dll.showArray());

dll.deleteLast();
console.log(dll);
console.log(dll.showArray());

dll.delete(15);
console.log(dll);
console.log(dll.showArray());

dll.insertValAfter(55, 22);
console.log(dll);
console.log(dll.showArray());

dll.insertValAfter(50, 20);
console.log(dll);
console.log(dll.showArray());

dll.insertValAfter(66, 5);
console.log(dll);
console.log(dll.showArray());

dll.delete(5);
console.log(dll);
console.log(dll.showArray());

dll.insertValAfter(88, 66);
console.log(dll);
console.log(dll.showArray());

console.log(dll.traverseTo(88).value);
console.log(dll.traverseTo(66).value);
console.log(dll.traverseTo(22).value);
console.log(dll.traverseTo(55).value);


console.log("current status: ", dll.showArray());
console.log("current length: ", dll.length);

console.log(dll.showDetailedArray());