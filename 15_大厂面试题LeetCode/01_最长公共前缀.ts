function longestCommonPrefix(strs: string[]): string {
  const n = strs.length
  if (n < 1) return ''
  let prefix = strs[0]
  for (let i = 1; i < n; i++) {
    const s = strs[i]
    while (!s.includes(prefix)) {
      prefix = prefix.slice(0, prefix.length - 1)
      if (prefix.length === 0) return ''
    }
  }

  return prefix
}

console.log(longestCommonPrefix(["flower","flow","flight"]))
