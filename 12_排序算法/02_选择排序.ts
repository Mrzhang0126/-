import { swap, testSort } from './utils';

function selectionSort(arr: number[]) {
  const n = arr.length

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }

    if (i !== minIndex) {
      swap(arr, i, minIndex)
    }
  }

  return arr
}

testSort(selectionSort)
