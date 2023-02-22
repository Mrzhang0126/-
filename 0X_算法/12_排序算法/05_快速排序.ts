import { swap, testSort } from './utils';

function quickSort(arr: number[]) {
  function partition(left: number, right: number) {
    if (left >= right) return

    const pivot = arr[right]
    let i = left, j = right - 1

    while (i <= j) {
      while (arr[i] < pivot) i++
      while (arr[j] > pivot) j--
      if (i <= j) {
        swap(arr, i, j)
        i++
        j--
      }
    }

    swap(arr, i, right)
    partition(left, j)
    partition(i, right)
  }
  partition(0, arr.length - 1)

  return arr
}


function quickSort2(arr: number[]): number[] {
  function middle(a: number, b: number, c: number): number {
    if (a > b) {
      [a, b] = [b, a];
    }
    if (b > c) {
      [b, c] = [c, b];
    }
    if (a > b) {
      [a, b] = [b, a];
    }
    return b;
  }
  
  function partition(array: number[], left: number = 0, right: number = array.length - 1): number[] {
    if (left >= right) {
      return array;
    }

    // 三数取中法选取基准元素
    const pivot = middle(array[left], array[right], array[Math.floor((left + right) / 2)]);

    let i = left;
    let j = right;

    while (i <= j) {
      while (array[i] < pivot) {
        i++;
      }
      while (array[j] > pivot) {
        j--;
      }
      if (i <= j) {
        [array[i], array[j]] = [array[j], array[i]];
        i++;
        j--;
      }
    }

    // 将基准元素移动到中间位置
    const mid = Math.floor((left + right) / 2);
    [array[mid], array[j + 1]] = [array[j + 1], array[mid]];

    partition(array, left, j);
    partition(array, i, right);

    return array;
  }

  return partition(arr);
}
