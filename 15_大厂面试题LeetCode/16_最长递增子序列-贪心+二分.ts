function lengthOfLIS(nums: number[]): number {
  const n = nums.length
  const tails: number[] = []
  
  for (let i = 0; i < n; i++) {
    const num = nums[i]
    let l = 0, r = tails.length - 1

    while (l <= r) {
      const mid = (l + r) >>> 1
      if (nums[mid] <= num) {
        l = mid + 1
      } else {
        r = mid - 1
      }
    }

    l === tails.length ? tails.push(num) : tails[l] = num
  } 
  return tails.length
}



console.log(lengthOfLIS([1, 2, 8, 6, 7]))


export {}
