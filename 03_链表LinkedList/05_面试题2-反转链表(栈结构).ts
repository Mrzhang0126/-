import ListNode from "./ListNode";

function reverseList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head
  const stack: ListNode[] = []
  let current: ListNode | null = head
  while (current) {
    stack.push(current)
    current = current.next
  }

  const newHead: ListNode | null = stack.pop()!
  let newCurrent = newHead
  while (stack.length) {
    const node = stack.pop()!
    newCurrent.next = node
    newCurrent = newCurrent.next
  }
  newCurrent.next = null
  return newHead
}

// 模拟数据进行测试
const node1 = new ListNode(1)
node1.next = new ListNode(2)
node1.next.next = new ListNode(3)
node1.next.next.next = new ListNode(4)

const newHead = reverseList(node1)

let current = newHead
while (current) {
  console.log(current.val)
  current = current.next
}


export {}
