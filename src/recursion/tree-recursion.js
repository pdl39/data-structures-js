// Implementing a simple tree recursion.

let count = 0;
let nullCount = 0;
let result = [];

function treeRecursion(n) {
  if (n > 0) {
    count++;
    result.push(n);
    treeRecursion(n - 1);
    treeRecursion(n - 1);
  }
  else {
    nullCount++;
  }
}


treeRecursion(5);
const totalCalls = count + nullCount;
console.log({result});
console.log({count});
console.log({nullCount});
console.log({totalCalls});