import { testSort } from './utils';

function shellSort(arr: number[]) {
  const n = arr.length

  let gap = n >>> 1
  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      let j = i, temp = arr[i]
      while (j > gap - 1 && arr[j-gap] > temp) {
        arr[j] = arr[j-gap]
        j -= gap
      }
      arr[j] = temp
    }

    gap = gap >>> 1
  }
  return arr
}

function shellSortHibbard(array: number[]): number[] {
  const n = array.length;

  // 计算 Hibbard 增量序列
  const increments = [1];
  let k = 1;
  while (increments[k - 1] < n) {
    increments.push(2 ** k - 1);
    k++;
  }

  // 对每个增量进行希尔排序
  for (let i = increments.length - 1; i >= 0; i--) {
    const increment = increments[i];

    // 对每个子序列进行插入排序
    for (let j = increment; j < n; j++) {
      const temp = array[j];
      let k = j;
      while (k >= increment && array[k - increment] > temp) {
        array[k] = array[k - increment];
        k -= increment;
      }
      array[k] = temp;
    }
  }

  return array;
}


testSort(shellSort)
