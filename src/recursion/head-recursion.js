// Implementing a simple head recursion function.
 
function headRecursion(n) {
  if (n > 0) {
    headRecursion(n - 1);
    console.log(n);
  }
}

headRecursion(10);