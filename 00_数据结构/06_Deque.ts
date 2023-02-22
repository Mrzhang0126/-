import ArrayQueue, { LinkedQueue, Node } from './05_Queue';

class ArrayDeque<T> extends ArrayQueue<T> {
  front(value: T) {
    this.data.unshift(value)
  }

  pop(): T | undefined {
    return this.data.pop()
  }
}


class LinkedDeque<T> extends LinkedQueue<T> {
  front(value: T) {
    const node = new Node(value)
    if (!this.head) {
      this.head = this.tail = node
    } else {
      node.next = this.head
      this.head = node
    }
    this.N++
  }

  pop(): T | undefined {
    if (!this.tail) return
    let current = this.head, parent: Node<T> | null = null
    while (current && current.next) {
      parent = current
      current = current.next
    }
    this.N--
    if (this.N === 0) {
      this.head = this.tail = null
    } else {
      parent!.next = null
      this.tail = parent
    }
    return current?.value 
  }
}
