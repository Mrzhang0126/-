import LinkedList from "./01_单向链表重构";

class CircularLinkedList<T> extends LinkedList<T> {
  append(value: T): void {
    super.append(value)
    this.tail!.next = this.head
  }

  insert(index: number, value: T): boolean {
    const is = super.insert(index, value)
    if (is && (index === this.size - 1 || index === 0)) {
      this.tail!.next = this.head
    }
    return is
  }

  removeAt(index: number): T | null {
    const value = super.removeAt(index)
    if (value && this.tail && (index === this.size || index === 0)) {
      this.tail.next = this.head
    }
    return value
  }
}

const cLinkedList = new CircularLinkedList<string>()
console.log('------------ 测试append ------------')
cLinkedList.append("aaa")
cLinkedList.append("bbb")
cLinkedList.append("ccc")
cLinkedList.append("ddd")
cLinkedList.toString()

console.log('------------ 测试insert ------------')
cLinkedList.insert(0, "abc")
cLinkedList.toString()
cLinkedList.insert(2, "cba")
cLinkedList.insert(6, "nba")
cLinkedList.toString()

// 测试删除节点
console.log('------------ 测试removeAt ------------')
cLinkedList.removeAt(0)
cLinkedList.removeAt(0)
cLinkedList.toString()

console.log(cLinkedList.removeAt(2))
cLinkedList.toString()
console.log(cLinkedList.removeAt(3))
cLinkedList.toString()
console.log(cLinkedList.removeAt(3))
cLinkedList.toString()

console.log('------------ 测试get ------------')
console.log(cLinkedList.get(0))
console.log(cLinkedList.get(1))
console.log(cLinkedList.get(2))
console.log(cLinkedList.get(3))

console.log('------------ 测试update ------------')
cLinkedList.update(1, "why")
cLinkedList.update(2, "kobe")
cLinkedList.toString()

console.log('------------ 测试indexOf ------------')
console.log(cLinkedList.indexOf("cba"))
console.log(cLinkedList.indexOf("why"))
console.log(cLinkedList.indexOf("kobe"))
console.log(cLinkedList.indexOf("james"))


console.log('------------ 测试remove ------------')
cLinkedList.remove("why")
cLinkedList.remove("cba")
cLinkedList.remove("kobe")
cLinkedList.traverse()
console.log(cLinkedList.isEmpty())
console.log(cLinkedList.length)
