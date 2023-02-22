import { cbtPrint } from 'hy-algokit'
class Heap<T> {
  data: T[] = []
  private size: number = 0
  private isMax: boolean

  constructor(arr: T[], isMax = true) {
    this.isMax = isMax
    if (arr.length === 0) return 
    this.buildHeap(arr)
  }

  private swap(i: number, j: number) {
    const temp = this.data[i]
    this.data[i] = this.data[j]
    this.data[j] = temp
  }

  private compare(i: number, j: number): boolean {
    if (this.isMax) {
      return this.data[i] >= this.data[j]
    } else {
      return this.data[i] <= this.data[j]
    }
  }

  insert(value: T) {
    this.data.push(value)
    this.size++
    this.heapifyUp()
  }
  // 上滤操作
  private heapifyUp(){
    let index = this.size - 1

    while (index > 0) {
      let pIndex = (index - 1) >>> 1
      if (this.data[pIndex] >= this.data[index]) {
        break
      }
      this.swap(index, pIndex)
      index = pIndex
    }
  }

  extract(): T | undefined {
    if (this.size === 0) return undefined
    if (this.size === 1) {
      this.size--
      return this.data.pop()
    }
    const topValue = this.data[0]
    this.data[0] = this.data.pop()!
    this.size--
    this.heapifyDown(0)
    return topValue
  }
  // 下滤操作
  private heapifyDown(start: number) {
    let index = start
    while (2 * index + 1 < this.size) {
      let lcIndex = 2 * index + 1
      let rcIndex = lcIndex + 1, maxIndex = lcIndex
      if (rcIndex < this.size && this.data[rcIndex] >= this.data[lcIndex]) {
        maxIndex = rcIndex
      }

      if (this.data[index] >= this.data[maxIndex]) {
        break
      }
      this.swap(index, maxIndex)
      index = maxIndex
    }
  }

  get length() {
    return this.size
  }

  peek(): T | undefined {
    return this.data[0]
  }

  isEmpty() {
    return this.size === 0
  }

  buildHeap(arr: T[]) {
    this.data = arr
    this.size = arr.length

    let start = this.size >>> 1 - 1
    for (let i = start; i >= 0; i--) {
      this.heapifyDown(i)
    }
  }
}


// 1.测试插入操作
// const arr = [19, 100, 36, 17, 3, 25]
// const heap = new Heap<number>([], false)
// for (const item of arr) {
//   heap.insert(item)
// }
// console.log(heap.data)

// while (!heap.isEmpty()) {
//   console.log(heap.extract())
// }


const arr = [19, 100, 36, 17, 3, 25]
const heap = new Heap<number>(arr)
console.log(cbtPrint(arr))