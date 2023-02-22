import LinkedList from './01_单向链表重构'
import { DoublyNode } from './LinkedNode'

class DoublyLinkedList<T> extends LinkedList<T> {
  protected head: DoublyNode<T> | null = null
  protected tail: DoublyNode<T> | null = null

  protected getNode(index: number): DoublyNode<T>|null {
    const mid = this.size >>> 1
    let isNext = index <= mid, current: DoublyNode<T>|null = null
    let idx = isNext ? 0 : this.size - 1
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
    this.size++
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
    this.size++
  }

  insert(index: number, value: T): boolean {
    if (index < 0 || index > this.size) return false
    if (index === 0) {
      this.prepend(value)
    } else if (index === this.size) {
      this.append(value)
    } else {
      const dNode = new DoublyNode(value)
      const current = this.getNode(index)!
      current.prev!.next = dNode
      dNode.next = current
      dNode.prev = current.prev
      current.prev = dNode

      this.size++
    }

    return true
  }

  removeAt(index: number): T | null {
    if (index < 0 || index >= this.size) return null
    let current: DoublyNode<T>|null = null
    if (index === 0) {
      current = this.head
      if (this.size === 1) {
        this.head = this.tail = null
      } else {
        this.head = this.head!.next 
        this.head!.prev = null
      }
    } else if (index === this.size - 1) {
      current = this.tail
      this.tail = this.tail!.prev
      this.tail!.next = null
    } else {
      current = this.getNode(index)!
      current.prev!.next = current.next
      current.next!.prev = current.prev
    }

    this.size--
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

// console.log('-------------- append/prepend --------------')
// const dLinkedList = new DoublyLinkedList<string>()
// dLinkedList.append("aaa")
// dLinkedList.append("bbb")
// dLinkedList.append("ccc")
// dLinkedList.append("ddd")
// dLinkedList.traverse()

// dLinkedList.prepend("abc")
// dLinkedList.prepend("cba")
// dLinkedList.traverse()
// console.log('-------------- insert --------------')
// dLinkedList.insert( 0, "why",)
// dLinkedList.traverse()
// dLinkedList.insert( 7, "kobe",)
// dLinkedList.traverse()
// dLinkedList.insert(3, "james", )
// dLinkedList.traverse()
// // dLinkedList.postTraverse()


// console.log('------------ 测试get ------------')
// console.log(dLinkedList.get(0))
// console.log(dLinkedList.get(1))
// console.log(dLinkedList.get(3))
// console.log(dLinkedList.get(7))
// console.log(dLinkedList.get(9))

// console.log('------------ 测试update ------------')
// // dLinkedList.update(1, "why", )
// dLinkedList.update( 2, "kobe",)
// dLinkedList.traverse()

// console.log('------------ 测试indexOf ------------')
// console.log(dLinkedList.indexOf("cba"))
// console.log(dLinkedList.indexOf("why"))
// console.log(dLinkedList.indexOf("kobe"))
// console.log(dLinkedList.indexOf("james"))

// console.log('------------ 测试remove ------------')
// dLinkedList.remove("why")
// dLinkedList.remove("cba")
// dLinkedList.remove("kobe")
// dLinkedList.traverse()

// console.log(dLinkedList.isEmpty())
// console.log(dLinkedList.length)
