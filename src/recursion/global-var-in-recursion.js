// Exploring the concept of using/treating global variables in recursion.

// Following function uses recursion normally (with NO global variables).
function normalRecursion(n) {
  if (n > 0) {
    return normalRecursion(n - 1) + n;
  }
  return 0;
}

console.log(normalRecursion(5));


// Following function uses recursion with the global variable x.

let x = 0;

function staticVarInRecursion(n) {
  if (n > 0) {
    x++
    return staticVarInRecursion(n - 1) + x;
  }
  return 0;
}

console.log(staticVarInRecursion(5));
console.log(staticVarInRecursion(5));
