import DoublyLinkedList from '../08_高级链表/03_双向链表(DoublyLinkedList)';
import { IStack } from './IStack'

class LinkedStack<T> implements IStack<T> {
  private data = new DoublyLinkedList<T>()

  push(element: T): void {
    this.data.append(element)
  }
  pop(): T | undefined {
    return this.data.removeLast() ?? undefined
  }
  peek(): T | undefined {
    return this.data.peek() ?? undefined
  }
  isEmpty(): boolean {
    return this.data.isEmpty()
  }
  size(): number {
    return this.data.length
  }
  clear(): void {
    this.data.clear()
  }
  
}

const ls = new LinkedStack<string>()
ls.push('aaa')
ls.push('bbb')
ls.push('ccc')
ls.push('ddd')
console.log(ls.size())
console.log(ls.pop())
console.log(ls.size())



