import { swap, testSort } from './utils';
function bubbleSort(arr: number[]) {
  const n = arr.length

  for (let i = n - 1; n >=0; i--) {
    let isSwapped = false
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j+1]) {
        swap(arr, j, j+1)
        isSwapped = true
      }
    }

    if (!isSwapped) break
  }

  return arr
}

testSort(bubbleSort)