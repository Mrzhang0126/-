// import { swap, testSort } from './utils'
// import { cbtPrint } from './print'

// function heapSort(arr: number[]): number[] {
//   const heapifyDown = (arr: number[], n: number, index: number) => {
//     while (2 * index + 1 < n) {
//       const lcIndex = 2 * index + 1, rcIndex = lcIndex + 1
//       let maxIndex = lcIndex
//       if (rcIndex < n && arr[rcIndex] > arr[lcIndex]) {
//         maxIndex = rcIndex
//       }

//       if (arr[index] >= arr[maxIndex]) break
//       swap(arr, index, maxIndex)
//       index = maxIndex
//     }
//   }

//   const n = arr.length
//   const start = n >>> 1 - 1
//   for (let i = start; i >= 0; i--) {
//     heapifyDown(arr, n, i)
//   }

//   for (let i = n - 1; i > 0; i--) {
//     swap(arr, i, 0)
//     heapifyDown(arr, i, 0)
//   }

//   return arr
// }

// function mergeSort(arr: number[]): number[] {
//   if (arr.length <= 1) return arr
//   const mid = arr.length >>> 1
//   const leftArr = arr.slice(0, mid)
//   const rightArr = arr.slice(mid)

//   const lArr = mergeSort(leftArr) 
//   const rArr = mergeSort(rightArr) 

//   let res: number[] = [], i = 0, j = 0
//   while(i < lArr.length && j < rArr.length) {
//     if (lArr[i] <= rArr[j]) {
//       res.push(lArr[i])
//       i++
//     } else {
//       res.push(rArr[j])
//       j++
//     }
//   }

//   if (i < lArr.length) res = res.concat(lArr.slice(i))
//   if (j < rArr.length) res = res.concat(rArr.slice(j))

//   return res
// }

// function quickSort(arr: number[]): number[] {
//   function partition(l: number, r: number) {
//     if (l >= r) return
//     const pivot = arr[r]
//     let i = l, j = r - 1
//     while (i <= j) {
//       while (arr[i] < pivot) i++
//       while (arr[j] > pivot) j--
//       if (i <= j) {
//         swap(arr, i, j)
//         i++
//         j--
//       }
//     }
//     swap(arr, i, r)
//     partition(l, j)
//     partition(i, r)
//   }
//   partition(0, arr.length - 1)
//   return arr
// }

// function binarySearch(arr: number[], num: number): number {
//   const n = arr.length
//   let l = 0, r = n - 1
//   while (l <= r) {
//     const mid = (l + r) >>> 1
//     if (arr[mid] > num) {
//       r = mid - 1
//     } else if (arr[mid] < num) {
//       l = mid + 1
//     } else {
//       return mid
//     }
//   }
//   return -1
// }

// testSort(quickSort)

// const arr = [1, 9, 10, 15, 20, 56]
// console.log(binarySearch(arr, 9))

import { swap, testSort } from './utils'

function heapSort(arr: number[]): number[] {
  function heapifyDown(arr: number[], n: number, index: number) {
    while (2 * index + 1 < n) {
      const lcIndex = 2 * index + 1, rcIndex = lcIndex + 1
      let maxIndex = lcIndex
      if (rcIndex < n && arr[rcIndex] > arr[lcIndex]) {
        maxIndex = rcIndex
      }
      if (arr[index] >= arr[maxIndex]) break
      swap(arr, index, maxIndex)
      index = maxIndex
    }
  }

  const n = arr.length
  const start = n >>> 1 - 1
  for (let i = start; i >= 0; i--) {
    heapifyDown(arr, n, i)
  }

  for (let i = n - 1; i > 0; i--) {
    swap(arr, i, 0)
    heapifyDown(arr, i, 0)
  }

  return arr
}

function quickSort(arr: number[]): number[] {
  function partition(l: number, r: number) {
    if (l >= r) return
    const pivot = arr[r]
    let i = l, j = r - 1
    while (i <= j) {
      while (arr[i] < pivot) i++
      while (arr[j] > pivot) j--
      if (i <= j) {
        swap(arr, i, j)
        i++
        j--
      }
    }
    swap(arr, i, r)
    partition(l, j)
    partition(i, r)
  }

  partition(0, arr.length - 1)
  return arr
}

function mergeSort(arr: number[]): number[] {
  const n = arr.length
  if (n <= 1) return arr
  const mid = n >>> 1
  const leftArr = arr.slice(0, mid)
  const rightArr = arr.slice(mid)

  const lArr = mergeSort(leftArr)
  const rArr = mergeSort(rightArr)

  let res: number[] = [], i = 0, j = 0
  while (i < lArr.length && j < rArr.length) {
    if (lArr[i] <= rArr[j]) {
      res.push(lArr[i])
      i++
    } else {
      res.push(rArr[j])
      j++
    }
  }

  if (i < lArr.length) res.push(...lArr.slice(i))
  if (j < rArr.length) res.push(...rArr.slice(j))
  return res
}

testSort(mergeSort)
