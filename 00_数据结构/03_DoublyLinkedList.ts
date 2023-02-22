import LinkedList from './01_LinkedList'
import { DoublyNode } from './type'

class DoublyLinkedList<T> extends LinkedList<T> {
  protected head: DoublyNode<T> | null = null
  protected tail: DoublyNode<T> | null = null

  protected getNode(index: number): DoublyNode<T>|null {
    const mid = this.N >>> 1
    let isNext = index <= mid, current: DoublyNode<T>|null = null
    let idx = isNext ? 0 : this.N - 1
    if (isNext) {
      current = this.head
      while (idx++ < index && current) {
        current = current.next
      }
    } else {
      current = this.tail
      while (idx-- > index && current) {
        current = current.prev
      }
    }
    return current
  }

  append(value: T) {  
    const dNode = new DoublyNode(value)
    if (!this.head) {
      this.head = this.tail = dNode
    } else {
      this.tail!.next = dNode
      dNode.prev = this.tail
      this.tail = dNode
    }
    this.N++
  }

  prepend(value: T) {
    const dNode = new DoublyNode(value)
    if (!this.head) {
      this.head = this.tail = dNode
    } else {
      dNode.next = this.head
      this.head.prev = dNode
      this.head = dNode
    }
    this.N++
  }

  insert(index: number, value: T): boolean {
    if (index < 0 || index > this.N) return false
    if (index === 0) {
      this.prepend(value)
    } else if (index === this.N) {
      this.append(value)
    } else {
      const dNode = new DoublyNode(value)
      const current = this.getNode(index)!
      current.prev!.next = dNode
      dNode.next = current
      dNode.prev = current.prev
      current.prev = dNode

      this.N++
    }

    return true
  }

  removeAt(index: number): T | null {
    if (index < 0 || index >= this.N) return null
    let current: DoublyNode<T>|null = null
    if (index === 0) {
      current = this.head
      if (this.N === 1) {
        this.head = this.tail = null
      } else {
        this.head = this.head!.next 
        this.head!.prev = null
      }
    } else if (index === this.N - 1) {
      current = this.tail
      this.tail = this.tail!.prev
      this.tail!.next = null
    } else {
      current = this.getNode(index)!
      current.prev!.next = current.next
      current.next!.prev = current.prev
    }

    this.N--
    return current?.value ?? null
  }

  postTraverse() {
    const values: T[] = []
    let current = this.tail
    while (current) {
      values.push(current.value)
      current = current.prev
    }
    console.log(values.join('->'))
    return values
  }
}

export default DoublyLinkedList

