import { IQueue } from "./type"

export class Node<T> {
  value: T
  next: Node<T> | null = null
  constructor(value: T) {
    this.value = value
  }
}

export class LinkedQueue<T> implements IQueue<T> {
  protected head: Node<T> | null = null
  protected tail: Node<T> | null = null
  protected N: number = 0

  enqueue(element: T): void {
    const node = new Node(element)
    if (!this.tail) {
      this.head = this.tail = node
    } else {
      this.tail.next = node
      this.tail = node
    }
    this.N++
  }
  dequeue(): T | undefined {
    if (this.N <= 0) return
    const node = this.head
    this.head = this.head?.next ?? null
    this.N--
    if (this.N === 0) this.head = this.tail = null
    return node?.value
  }
  peek(): T | undefined {
    return this.head?.value ?? undefined
  }
  isEmpty(): boolean {
    return this.N === 0
  }
  size(): number {
    return this.N 
  }
  clear(): void {
    this.head = this.tail = null
    this.N = 0
  }
}


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

