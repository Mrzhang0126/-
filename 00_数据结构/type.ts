export class Node<T> {
  value: T
  next: Node<T> | null = null
  constructor(value: T) {
    this.value = value
  }
}

export class DoublyNode<T> extends Node<T> {
  prev: DoublyNode<T> | null = null
  next: DoublyNode<T> | null = null
}

export interface IStack<T> {
  push(element: T): void
  pop(): T | undefined
  peek(): T | undefined
  isEmpty(): boolean
  size(): number
  clear(): void
}

export interface IQueue<T> {
  enqueue(element: T): void
  dequeue(): T | undefined
  peek(): T | undefined
  isEmpty(): boolean
  size(): number
  clear(): void
}
