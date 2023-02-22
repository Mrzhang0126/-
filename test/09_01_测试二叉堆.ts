import { cbtPrint } from './print'
class Heap<T> {
  data: T[] = []
  size: number = 0
  isMax: boolean

  constructor(arr: T[] = [], isMax = true) {
    this.isMax = isMax
    if (arr.length === 0) return
    this.buildHeap(arr)
  }

  swap(i: number, j: number) {
    const temp = this.data[i]
    this.data[i] = this.data[j]
    this.data[j] = temp
  }

  compare(i: number, j: number): boolean {
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

  heapifyUp() {
    let index = this.size - 1

    while (index > 0) {
      let pIndex = (index - 1) >>> 1
      if (this.compare(pIndex, index)) break
      this.swap(index, pIndex)
      index = pIndex
    }
  }

  extract(): T | undefined {
    if (this.size === 0) return
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

  heapifyDown(index: number) {
    while (2 * index + 1 < this.size) {
      const lcIndex = 2 * index + 1, rcIndex = lcIndex + 1
      let maxIndex = lcIndex
      if (rcIndex < this.size && this.compare(rcIndex, lcIndex)) {
        maxIndex = rcIndex
      }

      if (this.compare(index, maxIndex)) break
      this.swap(maxIndex, index)
      index = maxIndex
    }
  }

  isEmpty(): boolean {
    return this.size === 0
  }

  buildHeap(arr: T[]) {
    this.data = arr
    this.size = arr.length
    const start = (this.size - 1) >>> 1
    for (let i = start; i >= 0; i--) {
      this.heapifyDown(i)
    }
  }
}


const arr = [19, 100, 36, 17, 3, 25, 19, 133, 1145]
const heap = new Heap<number>(arr, true)
// for (const item of arr) {
//   heap.insert(item)
// }
cbtPrint(arr)
// console.log(arr)

// while (!heap.isEmpty()) {
//   console.log(heap.extract())
// }