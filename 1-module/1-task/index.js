function factorial(n) {
  let operand = n;
  let result = 1;

  for (let i = 1; i < n; i++) {
    result *= operand;
    operand = (n - i);
  }

  return result;
}
