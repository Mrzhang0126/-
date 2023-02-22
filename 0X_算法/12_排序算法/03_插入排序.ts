import { swap, testSort } from './utils';

function insertionSort(arr: number[]): number[] {
  const n = arr.length

  for (let i = 1; i < n; i++) {
    let j = i - 1, num = arr[i]
    while (arr[j] > num && j >= 0){
      arr[j+1] = arr[j]
      j--
    }

    arr[j+1] = num
  }

  return arr
}

testSort(insertionSort)
// const nums = [10, 78, 56, 100, 4, 1, 99, 88, 456, 36, 9]
// console.log(insertionSort(nums))
