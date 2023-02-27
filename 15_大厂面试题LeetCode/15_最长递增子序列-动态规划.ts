function lengthOfLIS(nums: number[]): number {
  const n = nums.length
  const dp: number[] = new Array(n).fill(1)
  let max = dp[0]

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
    max = Math.max(max, dp[i])
  }
  console.log('dp', dp)
  return max
}

export {}

console.log(lengthOfLIS([1, 2, 8, 6, 7]))