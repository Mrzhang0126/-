
function binarySearch(arr: number[], num: number) {
  // arr = arr.sort((a, b) => a - b)
  let left = 0, right = arr.length - 1
  while (left <= right) {
    const mid = (left + right) >>> 1
    const midNum = arr[mid]
    if (midNum === num) {
      return mid
    } else if (midNum < num) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return -1
}

const index = binarySearch([1, 3, 5, 10, 100, 222, 333], 333)
console.log(index)

const a = [10, 20, 3, 6, 78, 32]
const sort = (arr: number[]) => arr.sort((a:number, b:number) => a-b)
console.log(sort(a))


export default binarySearch


