import Heap from '../09_堆结构Heap/02_设计堆(二叉堆-重构)';

class PriorityQueue<T> {
  private heap: Heap<T> = new Heap()

  enqueue(value: T) {
    this.heap.insert(value)
  }

  dequeue(): T | undefined {
    return this.heap.extract()
  }

  peek(): T | undefined {
    return this.heap.peek()
  }

  isEmpty() {
    return this.heap.isEmpty()
  }

  size() {
    return this.heap.length
  }
}


class Student {
  // name: string
  // score: number
  constructor(public name: string, public score: number) {
    // this.name = name
    // this.score = score
  }

  valueOf() {
    return this.score
  }
}


const pQueue = new PriorityQueue<Student>()
pQueue.enqueue(new Student("why", 99))
pQueue.enqueue(new Student("kobe", 89))
pQueue.enqueue(new Student("james", 95))
pQueue.enqueue(new Student("curry", 88))

while (!pQueue.isEmpty()) {
  console.log(pQueue.dequeue())
}
