import { swap, testSort } from './utils';

function heapSort(arr: number[]) {
  const n = arr.length

  const start = Math.floor(n / 2 - 1)
  for (let i = start; i >= 0; i--) {
    heapifyDown(arr, n, i)
  }

  for (let i = n - 1; i > 0; i--) {
    swap(arr, 0, i)
    heapifyDown(arr, i, 0)
  }

  function heapifyDown(arr: number[], n: number, index: number) {
    while (2 * index + 1 < n) {
      const lcIndex = 2 * index + 1, rcIndex = lcIndex + 1
      let maxIndex = lcIndex
      if (rcIndex < n && arr[rcIndex] > arr[lcIndex]) maxIndex = rcIndex

      if (arr[index] >= arr[maxIndex]) break
      swap(arr, index, maxIndex)
      index = maxIndex
    }
  }

  return arr
}

testSort(heapSort)
