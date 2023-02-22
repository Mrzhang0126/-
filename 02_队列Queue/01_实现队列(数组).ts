import { IQueue } from "./IQueue"
class ArrayQueue<T> implements IQueue<T> {
  protected data: T[] = []

  enqueue(element: T) {
    this.data.push(element)
  }

  dequeue(): T | undefined {
    return this.data.shift()
  }

  peek(): T | undefined {
    return this.data[0]
  }

  isEmpty(): boolean {
    return this.data.length === 0
  }

  size(): number {
    return this.data.length
  }

  clear(): void {
    this.data = []
  }
}

export default ArrayQueue
