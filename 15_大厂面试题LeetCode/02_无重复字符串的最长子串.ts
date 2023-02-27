function lengthOfLongestSubstring(s: string): number {
  const n = s.length
  if (n <= 1) return n

  let l = 0, maxLen = 0
  const map = new Map<string, number>()

  for (let r = 0; r < n; r++) {
    const char = s[r]
    if (map.has(char) && map.get(char)! >= l) {
      l = map.get(char)! + 1
    }
    map.set(char, r)

    const curLen = r - l + 1
    maxLen = Math.max(maxLen, curLen)
  }


  return maxLen
};

console.log(lengthOfLongestSubstring("aaamm"))
export {}