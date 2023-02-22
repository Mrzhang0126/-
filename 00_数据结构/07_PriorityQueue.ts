import Heap from "./08_Heap";

// 实现一
class PriorityNode<T> {
  constructor(public value: T, public priority: number = 0){
    this.value = value
    this.priority = priority
  }

  valueOf() {
    return this.priority
  }
}

class PriorityQueue<T> {
  private heap: Heap<PriorityNode<T>> = new Heap()

  enqueue(value: T, priority: number) {
    const node = new PriorityNode(value, priority)
    this.heap.insert(node)
  }

  dequeue(): T | undefined {
    return this.heap.extract()?.value
  }

  peek(): T | undefined {
    return this.heap.peek()?.value
  }

  isEmpty() {
    return this.heap.isEmpty()
  }

  size() {
    return this.heap.length
  }
}



// 实现二

// class PriorityQueue<T> {
//   private heap: Heap<T> = new Heap()

//   enqueue(value: T) {
//     this.heap.insert(value)
//   }

//   dequeue(): T | undefined {
//     return this.heap.extract()
//   }

//   peek(): T | undefined {
//     return this.heap.peek()
//   }

//   isEmpty() {
//     return this.heap.isEmpty()
//   }

//   size() {
//     return this.heap.length
//   }
// }

