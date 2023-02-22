import ArrayStack from "../01_栈结构/01_实现栈结构Stack(数组)";

// 创建Stack的实例
const stack1 = new ArrayStack<string>()
stack1.push("aaa")
stack1.push("bbb")
stack1.push("ccc")
stack1.push("ddd")

console.log(stack1.peek())
console.log(stack1.pop())
console.log(stack1.pop())
const res = stack1.pop()
if (res) {
  console.log(res.split(""))
}
res?.split("")

console.log(stack1.isEmpty())
console.log(stack1.size())


const stack2 = new ArrayStack<number>()
stack2.push(1)
stack2.push(6)
stack2.push(10)
