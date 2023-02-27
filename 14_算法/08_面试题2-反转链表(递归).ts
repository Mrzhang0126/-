import ListNode from "./ListNode";

function reverseList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head
  const newHead = reverseList(head?.next ?? null)
  head.next.next = head
  head.next = null
  return newHead
}

// 模拟数据进行测试
const node1 = new ListNode(1)
node1.next = new ListNode(2)
node1.next.next = new ListNode(3)

const newHead = reverseList(node1)

let current = newHead
while (current) {
  console.log(current.val)
  current = current.next
}


export {}
