import Heap from '../09_堆结构Heap/02_设计堆(二叉堆-重构)';

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


const pQueue = new PriorityQueue<string>()
pQueue.enqueue("why", 98)
pQueue.enqueue("kobe", 90)
pQueue.enqueue("james", 105)
while (!pQueue.isEmpty()) {
  console.log(pQueue.dequeue())
}
