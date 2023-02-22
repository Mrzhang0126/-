class Node<T> {
  value: T
  next: Node<T> | null = null
  // prev?: Node<T> | null = null
  constructor(value: T) {
    this.value = value
  }
}

class LinkedList<T> {
  private head: Node<T> | null = null
  private size: number = 0
  get length() {
    return this.size
  }

  toString(): string {
    const values: T[] = []
    let current = this.head
    while (current) {
      values.push(current.value)
      current = current.next
    }
    const res = values.join('->')
    console.log(res)
    return res
  }

  private getNode(index: number): Node<T>|null {
    let current = this.head, idx = 0
    while (idx++ < index && current) {
      current = current.next
    }
    return current
  }

  append(value: T) {
    const node = new Node(value)
    if (!this.head) {
      this.head = node
    } else {
      let current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
    this.size++
  }

  insert(value: T, index: number): boolean {
    if (index < 0 || index > this.size) return false
    const node = new Node(value)

    if (index === 0) {
      node.next = this.head
      this.head = node
    } else {
      let current = this.head, idx = 0, prev: Node<T>|null = null
      while (idx++ < index && current) {
        prev = current
        current = current.next
      }
      prev!.next = node
      node.next = current
    }
    this.size++
    return true
  }

  removeAt(index: number): T | null {
    if (index < 0 || index > this.size) return null
    let current = this.head, idx = 0, prev: Node<T>| null = null
    if (index === 0) {
      this.head = current!.next
    } else {
      while (idx++ < index && current) {
        prev = current
        current = current.next
      }
      prev!.next = current?.next ?? null
    }
    this.size--
    return current?.value ?? null
  }

  indexOf(value: T): number {
    let current = this.head, idx = 0

    while (current) {
      if (current.value === value) return idx
      current = current.next
      idx++
    }

    return -1
  }

  get(index: number): T | null {
    if (index < 0 || index > this.size) return null
    return this.getNode(index)?.value ?? null
  }

  update(index: number, value: T): boolean {
    if (index < 0 || index > this.size) return false
    const node = this.getNode(index)
    node!.value = value
    return true
  }

  isEmpty(): boolean {
    return this.size === 0
  }

  clear() {
    this.head = null
    this.size = 0
  }
}


export default LinkedList