// Implementing a singly linked list.

class Node {
  constructor(val=null) {
    this.value = val;
    this.next = null;
  }
}

export default class LinkedListS {
  constructor(val=null) {
    this.head = val === null ? null : new Node(val);
    this.tail = this.head;
    this.length = val === null ? 0 : 1;
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
  It shows the node's next node and whether it is the head, tail, or a middle node. */
  showDetailedArray() {
    let currentNode = this.head;
    let detailedArray = [];

    while (currentNode !== null) {
      let isHead = currentNode === this.head ? "HEAD" : false;
      let isTail = currentNode === this.tail ? "TAIL" : false;
      let isMiddle = !isHead && !isTail ? "middle" : false;

      detailedArray.push(new Map([
        [currentNode.value,
        {
          "next": currentNode.next ? currentNode.next.value : currentNode.next, 
          "node-trait": isHead || isTail || isMiddle
        }]
      ]));
      currentNode = currentNode.next;
    }
    return detailedArray;
  }

  traverseTo(val) { // O(n)
    if (this.head === null) return undefined;

    let currentNode = this.head;

    while (currentNode.value !== val) {
      currentNode = currentNode.next;
      if (currentNode === null) break;
    }

    return currentNode || undefined;
  }

  append(val) { // O(1) given information on the tail node.
    const node = new Node(val);

    if (this.head === null) {
      this.head = node;
      this.tail = node;
    }
    else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
    
    return this;
  }

  prepend(val) { // O(1)
    const node = new Node(val);

    if (this.head === null) {
      this.head = node;
      this.tail = node;
    }
    else {
      node.next = this.head;
      this.head = node;
    }
    this.length++;
    
    return this;
  }

  insertValAfter(val, targetVal) { // O(n)
    if (this.head === null) return undefined;

    let node = new Node(val);
    let currentNode = this.head;
    while (currentNode.next !== null) {
      if (currentNode.value === targetVal) break;
      currentNode = currentNode.next;
    }
    
    // if the node to insert after doesn't exist, return undefined.
    if (currentNode === this.tail && currentNode.value !== targetVal) return undefined;
    // if the node to insert after is the tail, call the append() method.
    if (currentNode === this.tail && currentNode.value === targetVal) return this.append(val);
    
    // if the node to insert after is a middle node, do the following:
    node.next = currentNode.next;
    currentNode.next = node;
    this.length++;

    return this;
  }

  deleteFirst() { // O(1)
    if (this.head === null) return undefined;

    let prevHead = this.head;
    this.head = prevHead.next;
    this.length--;

    return prevHead;
  }

  deleteLast() { // O(n)
    if (this.head === null) return undefined;

    let currentNode = this.head;
    while (currentNode.next.next !== null) {
      currentNode = currentNode.next;
    }
    
    let prevTail = currentNode.next;
    currentNode.next = null;
    this.tail = currentNode;
    this.length--;
    
    return prevTail;
  }

  deleteMiddle(node) { // O(1) given direct access to the middle node.
    // Make sure the input node is neither the head nor the tail node.
    if (node === this.head || node === this.tail) return undefined;

    let currentNode = node;

    // Copy over the next node into the current node and then delete the next node.
    currentNode.value = currentNode.next.value;
    currentNode.next = currentNode.next.next;

    // If the deleted node was the tail node, update tail as the currentNode.
    if (currentNode.next === null) this.tail = currentNode;
    this.length--;

    return currentNode;
  }

  deleteNode(node) { // O(n) if node to delete is the tail node. O(1) otherwise.
    let currentNode = node;

    if (!currentNode) return undefined;
    if (currentNode === this.head) return this.deleteFirst(currentNode.value);
    if (currentNode === this.tail) return this.deleteLast(currentNode.value);
    return this.deleteMiddle(currentNode);
  }

  delete(val) { // O(n)
    if (this.head === null) return undefined;

    let currentNode = this.traverseTo(val);
    return this.deleteNode(currentNode);
  }

  // delete(val) { // O(n)
  //   if (this.head === null) return undefined;

  //   let currentNode = this.head;

  //   // if node to delete is the head, call the deleteFirst() method.
  //   if (currentNode.value === val) return this.deleteFirst();

  //   while (currentNode.next.next !== null) {
  //     if (currentNode.next.value === val) break;
  //     currentNode = currentNode.next;
  //   }

  //   // if node to delete doesn't exist, return undefined.
  //   if (currentNode.next === this.tail && currentNode.next.value !== val) return undefined;
  //   // if node to delete is the tail, call the deleteLast() method.
  //   if (currentNode.next === this.tail && currentNode.next.value === val) return this.deleteLast();
    
  //   // if node to delete is a middle node, do the following:
  //   let confirmDeleteVal = currentNode.next.value === val;
  //   let nodeToDelete = confirmDeleteVal ? currentNode.next : undefined;
  //   currentNode.next = currentNode.next.next;
  //   this.length--;
    
  //   return nodeToDelete;
  // }
}


//---------------------------------------------------------------------------------------
// EXAMPLE
const sll = new LinkedListS(5);
console.log(sll);

sll.append(10);
console.log(sll.showArray());
console.log(sll.showDetailedArray());

sll.append(15);
console.log(sll.showArray());
console.log(sll.showDetailedArray());

sll.prepend(55);
console.log(sll.showArray());
console.log(sll.showDetailedArray());

sll.append(8);
console.log(sll.showArray());
console.log(sll.showDetailedArray());

sll.append(11);
console.log(sll.showArray());
console.log(sll.showDetailedArray());

sll.deleteFirst();
console.log(sll.showArray());
console.log(sll.showDetailedArray());

sll.deleteLast();
console.log(sll.showArray());
console.log(sll.showDetailedArray());

sll.insertValAfter(6, 10);
console.log(sll.showArray());
console.log(sll.showDetailedArray());

console.log(sll.insertValAfter(6, 11));
console.log(sll.showArray());
console.log(sll.showDetailedArray());

sll.delete(15);
console.log(sll.showArray());
console.log(sll.showDetailedArray());

sll.insertValAfter(122, 5);
console.log(sll.showArray());
console.log(sll.showDetailedArray());

sll.delete(8);
console.log(sll.showArray());
console.log(sll.showDetailedArray());

sll.insertValAfter(23, 122);
console.log(sll.showArray());
console.log(sll.showDetailedArray());

sll.insertValAfter(61, 6);
console.log(sll.showArray());
console.log(sll.showDetailedArray());

sll.delete(5);
console.log(sll.showArray());
console.log(sll.showDetailedArray());

sll.insertValAfter(77, 122);
console.log(sll.showArray());
console.log(sll.showDetailedArray());

console.log(sll.traverseTo(23).value);
console.log(sll.traverseTo(122).value);
console.log(sll.traverseTo(6).value);
console.log(sll.traverseTo(61).value);

console.log("current status: "
, sll.showArray());
console.log("current length: "
, sll.length);

console.log(sll.showDetailedArray());