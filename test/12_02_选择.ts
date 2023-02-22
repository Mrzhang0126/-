import { swap, testSort } from './utils';

function selectionSort(arr: number[]) {
  const n = arr.length

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i
    for (let j = 1; j < n; j++) {
      if (arr[j] > arr[j+1]) {
        minIndex = j
      }
    }
  }
}