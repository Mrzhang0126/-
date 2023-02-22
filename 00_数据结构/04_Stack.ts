import { IStack } from './type'

class ArrayStack<T> implements IStack<T> {
  private data: T[] = []

  push(element: T): void {
    this.data.push(element)
  }
  pop(): T | undefined {
    return this.data.pop()
  }
  peek(): T | undefined {
    return this.data[this.data.length - 1]
  }
  isEmpty(): boolean {
    return this.data.length === 0
  }
  size(): number {
    return this.data.length
  }
  clear() {
    this.data = []
  }
}

export default ArrayStack
