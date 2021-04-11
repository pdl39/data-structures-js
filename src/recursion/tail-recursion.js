// Implementing a simple tail recursion function.

function tailRecursion(n) {
  if (n > 0) {
    console.log(n);
    tailRecursion(n - 1);
  }
}

tailRecursion(10);