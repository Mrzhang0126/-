import Queue from "../02_队列Queue/01_实现队列(数组)";

const queue = new Queue<number>()

queue.enqueue(5)
queue.enqueue(6)
queue.enqueue(10)
queue.enqueue(3)

console.log(queue.dequeue());
console.log(queue.size());
console.log(queue.isEmpty());
console.log(queue.dequeue());

console.log(queue.dequeue());
console.log(queue.size());
console.log(queue.isEmpty());
console.log(queue.dequeue());

console.log(queue.size());
console.log(queue.isEmpty());