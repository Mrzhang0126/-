import ArrayQueue from "./01_实现队列(数组)";

function hotPotato(names: string[], num: number) {
  if (names.length === 0) return -1
  const queue = new ArrayQueue<string>()

  for (const name of names) {
    queue.enqueue(name)
  }

  while (queue.size() > 1) {
    for (let i = 1; i < num; i++) {
      queue.enqueue(queue.dequeue()!)
    }

    queue.dequeue()
  }

  return names.indexOf(queue.dequeue()!)
}

const leftIndex = hotPotato(["why", "james", "kobe", "curry","abc", "cba", "nba", "mba"], 4)
console.log(leftIndex)
