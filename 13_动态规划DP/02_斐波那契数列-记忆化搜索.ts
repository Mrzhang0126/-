
function fib(n: number, memo: number[] = []): number {
  if (n <= 1) return n

  // 求n的值, 直接拿到值返回即可
  if (memo[n]) {
    return memo[n]
  }

  // 没有从meno中获取到值
  const res = fib(n - 1, memo) + fib(n - 2, memo)
  memo[n] = res // 将n位置的结果存储到memo中

  return res
}

// 0 1 1 2 3 5 8 13 21 34 55
// console.log(fib(10))
console.log(fib(50))

export {}
