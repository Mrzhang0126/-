class Node<T> {
  value: T
  next: Node<T> | null = null
  prev: Node<T> | null = null
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

  private isOutBoundary(index: number): boolean {
    return index >= 0 && index < this.size
  }

  private getNode(index: number): Node<T> | null {
    let idx = 0, current = this.head
    while(idx++ < index && current) {
      current = current.next
    }
    return current
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

  append(value: T) {
    const node = new Node<T>(value)
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
    return true
  }

  insert(value: T, index: number): boolean {
    if (index < 0 || index > this.size) return false
    const node = new Node<T>(value)
    if (index === 0) {
      node.next = this.head
      this.head = node
    } else {
      const prev = this.getNode(index - 1)
      node.next = prev!.next
      prev!.next = node
    }
    this.size++
    return true 
  }

  removeAt(index: number): T | null { // isOut
    if (index < 0 || index >= this.size) return null
    let current = this.head
    if (index === 0) {
      this.head = current?.next ?? null
    } else {
      const prev = this.getNode(index - 1)
      current = prev!.next
      prev!.next = prev!.next?.next ?? null
    }
    this.size--
    return current?.value ?? null
  }

  get(index: number): T | null { // isOut
    if (index < 0 || index >= this.size) return null
    return this.getNode(index)?.value ?? null
  }

  update(index: number, value: T): boolean { // isOut
    if (index < 0 || index >= this.size) return false
    const current = this.getNode(index)
    current!.value = value
    return true
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

  remove(value: T): T | null {
    const idx = this.indexOf(value)
    return this.removeAt(idx)
  }

  isEmpty(): boolean {
    return this.size === 0
  }

  clear(): void {
    this.head = null
    this.size = 0
  }
}

export default LinkedList

// export {}