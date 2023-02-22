function fib(n: number): number {
  // n位置的值: (n-1) + (n-2)
  const memo: number[] = []
  for (let i = 0; i <= n; i++) {
    // 初始化状态0和1位置对应的数字是0和1
    if (i <= 1) {
      memo[i] = i
      continue
    }
    // i = 0 memo[0] = 0
    // i = 1 memo[1] = 1
    // i = 2 memo[2] = 1
    // i = 3 memo[3] = 2
    memo[i] = memo[i - 1] + memo[i - 2]
  }
  return memo[n]
}

// console.log(fib(10)) // 55
console.log(fib(50)) // 

export {}