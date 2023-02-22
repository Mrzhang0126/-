import { swap, testSort } from './utils'

function bubbleSort(arr: number[]) {
  const n = arr.length

  for (let j = n - 1; j >= 0; j--) {
    let isSwapped = false

    for (let i = 0; i < j; i++) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i+1)
        isSwapped = true
      }
    }
    if (!isSwapped) break
  }
  return arr
}

testSort(bubbleSort)
