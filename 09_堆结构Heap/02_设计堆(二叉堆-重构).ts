import { cbtPrint } from './print'
class Heap<T> {
  private data: T[] = []
  private size: number = 0
  private isMax: boolean

  constructor(arr: T[] = [], isMax = true) {
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
      if (this.compare(pIndex, index)) break
      this.swap(index, pIndex)
      index = pIndex
    }
  }

  extract(): T | undefined {
    if (this.size === 0) return undefined
    if (this.size === 1) {
      this.size--
      return this.data.pop()!
    }
    const topValue = this.data[0]
    this.data[0] = this.data.pop()!
    this.size--
    this.heapifyDown(0)
    return topValue
  }
  // 下滤操作
  private heapifyDown(index: number) {
    while (2 * index + 1 < this.size) {
      const lcIndex = 2 * index + 1, rcIndex = lcIndex + 1
      let maxIndex = lcIndex
      if (rcIndex < this.size && this.compare(rcIndex, lcIndex)) {
        maxIndex = rcIndex
      }

      if (this.compare(index, maxIndex)) break
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
    // 获取第一个非叶子节点
    const start = this.size >>> 1 - 1
    for (let i = start; i >= 0; i--) {
      this.heapifyDown(i)
    }
  }
}

export default Heap

// 1.测试插入操作
// const arr = [19, 100, 36, 17, 3, 25, 19]
// const heap = new Heap<number>([], true)
// for (const item of arr) {
//   heap.insert(item)
// }
// cbtPrint(heap.data)

// while (!heap.isEmpty()) {
//   console.log(heap.extract())
// }


// const arr = [19, 100, 36, 17, 3, 25, 24]
const arr = [19, 100, 36, 17, 3, 25, 19, 133, 1145, 120, 450, 2, 6]
const heap = new Heap<number>(arr, true)
// console.log(arr)
// cbtPrint(arr)
while (!heap.isEmpty()) {
  console.log(heap.extract())
}