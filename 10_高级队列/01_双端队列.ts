import ArrayQueue from '../02_队列Queue/01_实现队列(数组)';

class ArrayDeque<T> extends ArrayQueue<T> {
  front(value: T) {
    this.data.unshift(value)
  }

  pop(): T | undefined {
    return this.data.pop()
  }
}
