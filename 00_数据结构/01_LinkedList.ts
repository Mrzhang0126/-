import { Node } from './type'

class LinkedList<T> {
  protected head: Node<T> | null = null
  protected tail: Node<T> | null = null
  protected N: number = 0
  
  get size(): number {
    return this.N
  }

  protected getNode(index: number): Node<T> | null {
    let idx = 0, current: Node<T>|null = this.head
    while (idx++ < index && current) {
      current = current.next
    }
    return current
  }

  private isTail(node: Node<T>): boolean {
    return this.tail === node || node.next === this.head
  }

  append(value: T) {
    const node = new Node(value)
    if (!this.head) {
      this.head = node
    } else {
      this.tail!.next = node
    }
    this.tail = node
    this.N++
  }

  insert(index: number, value: T): boolean {
    if (index < 0 || index > this.N) return false
    const node = new Node(value)
    if (index === 0) {
      node.next = this.head
      this.head = node
    } else {
      const prev = this.getNode(index - 1)
      node.next = prev!.next
      prev!.next = node

      if (index === this.N) this.tail = node
    }
    this.N++

    return true
  }

  removeAt(index: number): T | null {
    if (index < 0 || index >= this.N) return null
    let current: Node<T> | null = this.head
    if (index === 0) {
      this.head = current?.next ?? null
      if (this.N === 1) this.head = this.tail = null
    } else {
      const prev = this.getNode(index - 1)
      current = prev!.next
      prev!.next = prev!.next?.next ?? null

      if (index === this.N - 1) this.tail = prev
    }
    this.N--
    return current?.value ?? null
  }

  get(index: number): T | null {
    if (index < 0 || index >= this.N) return null
    return this.getNode(index)?.value ?? null
  }

  update(index: number, value: T): boolean {
    if (index < 0 || index >= this.N) return false
    const node = this.getNode(index)
    node!.value = value
    return true
  }

  indexOf(value: T): number {
    let current: Node<T>|null = this.head, idx = 0
    while (current) {
      if (current.value === value) return idx
      this.isTail(current) ? current = null : current = current.next
      idx++
    }
    return -1
  }

  remove(value: T): T | null {
    const idx = this.indexOf(value)
    return this.removeAt(idx)
  }

  getFirst(): T | null {
    return this.removeAt(0)
  }

  getLast(): T | null {
    return this.removeAt(this.N - 1)
  }

  isEmpty(): boolean {
    return this.N === 0
  }

  traverse(): T[] {
    const values: T[] = []
    let current: Node<T>|null = this.head
    while (current) {
      values.push(current.value)
      this.isTail(current) ? current = null : current = current.next
    }
    if (this.head && this.tail && this.tail.next === this.head) values.push(this.head.value)
    console.log(values.join('->'))
    return values
  }

  peek(): T | null {
    return this.head?.value ?? null
  }

  peekLast(): T | null {
    return this.tail?.value ?? null
  }

  clear() {
    this.head = this.tail = null
    this.N = 0
  }
}

export default LinkedList

