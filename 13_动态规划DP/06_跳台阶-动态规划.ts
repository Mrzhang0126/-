function jump(n: number): number {
  // 1.定义状态
  // dp = [每一阶台阶不同的方法]
  // dp[3] = xx
  // 2.确定状态转移方程
  // dp[i] = dp[i-1] + dp[i-2]
  // 3.初始化状态
  // dp[0] = 1
  // dp[1] = 1
  // 思考: dp[2] = 2
  // 思考: dp[3] = 3
  // 思考: dp[4] = 2 + 3 = 5
  // 4.最终的答案: dp[n]
  // 1.定义状态
  const dp: number[] = []
  // 2.初始化状态
  dp[0] = 1
  dp[1] = 1
  // 3.状态转移方程
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  return dp[n]
}

console.log(jump(3))
console.log(jump(4))

export {}
