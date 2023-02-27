import ArrayStack from './01_实现栈结构Stack(数组)';

function decimalToBinary(num: number): number {
  const stack = new ArrayStack<number>()
  
  while (num > 0) {
    const res = num % 2
    stack.push(res)
    num = num >>> 1
  }

  let binary = ''
  while (!stack.isEmpty()) {
    binary += stack.pop() 
  }

  return parseInt(binary)
}

console.log(decimalToBinary(35))
console.log('------')
console.log(decimalToBinary(100))