import { Node } from './LinkedNode'

class LinkedList<T> {
  protected head: Node<T> | null = null
  protected tail: Node<T> | null = null
  protected size: number = 0
  
  get length(): number {
    return this.size
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
    this.size++
  }

  insert(index: number, value: T): boolean {
    if (index < 0 || index > this.size) return false
    const node = new Node(value)
    if (index === 0) {
      node.next = this.head
      this.head = node
    } else {
      const prev = this.getNode(index - 1)
      node.next = prev!.next
      prev!.next = node

      if (index === this.size) this.tail = node
    }
    this.size++

    return true
  }

  removeAt(index: number): T | null {
    if (index < 0 || index >= this.size) return null
    let current: Node<T> | null = this.head
    if (index === 0) {
      this.head = current?.next ?? null
      if (this.size === 1) this.head = this.tail = null
    } else {
      const prev = this.getNode(index - 1)
      current = prev!.next
      prev!.next = prev!.next?.next ?? null

      if (index === this.size - 1) this.tail = prev
    }
    this.size--
    return current?.value ?? null
  }

  get(index: number): T | null {
    if (index < 0 || index >= this.size) return null
    return this.getNode(index)?.value ?? null
  }

  update(index: number, value: T): boolean {
    if (index < 0 || index >= this.size) return false
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

  removeFirst(): T | null {
    return this.removeAt(0)
  }

  removeLast(): T | null {
    return this.removeAt(this.size - 1)
  }

  isEmpty(): boolean {
    return this.size === 0
  }

  traverse() {
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
    this.size = 0
  }
}


export default LinkedList

// const linkedList = new LinkedList<string>()
// console.log('------------ 测试append ------------')
// linkedList.append("aaa")
// linkedList.append("bbb")
// linkedList.append("ccc")
// linkedList.append("ddd")
// linkedList.toString()

// console.log('------------ 测试insert ------------')
// linkedList.insert(0, "abc")
// linkedList.toString()
// linkedList.insert(2, "cba")
// linkedList.insert(6, "nba")
// linkedList.toString()

// // 测试删除节点
// console.log('------------ 测试removeAt ------------')
// linkedList.removeAt(0)
// linkedList.removeAt(0)
// linkedList.toString()

// console.log(linkedList.removeAt(2))
// linkedList.toString()
// console.log(linkedList.removeAt(3))
// linkedList.toString()
// console.log(linkedList.removeAt(3))
// linkedList.toString()

// console.log('------------ 测试get ------------')
// console.log(linkedList.get(0))
// console.log(linkedList.get(1))
// console.log(linkedList.get(2))
// console.log(linkedList.get(3))

// console.log('------------ 测试update ------------')
// linkedList.update(1, "why")
// linkedList.update(2, "kobe")
// linkedList.toString()

// console.log('------------ 测试indexOf ------------')
// console.log(linkedList.indexOf("cba"))
// console.log(linkedList.indexOf("why"))
// console.log(linkedList.indexOf("kobe"))
// console.log(linkedList.indexOf("james"))


// console.log('------------ 测试remove ------------')
// console.log(linkedList.length)
// linkedList.remove("why")
// linkedList.remove("cba")
// linkedList.remove("kobe")
// linkedList.toString()
// console.log(linkedList.isEmpty())
// console.log(linkedList.length)


