import { swap, testSort } from './utils';

function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr

  const mid = arr.length >>> 1
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
