function binarySearch(array: number[], num: number) {
  let start = 0, end = array.length - 1

  while (start <= end) {
    const mid = (start + end) >>> 1
    const midNum = array[mid]
    if (midNum === num) {
      return mid
    } else if (midNum < num) {
      start = mid + 1
    } else {
      end = mid - 1
    }
  }

  return -1
}

const index = binarySearch([1, 3, 5, 10, 100, 222, 333], 5)
console.log(index)

export default binarySearch