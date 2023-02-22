import ListNode from "../03_链表LinkedList/ListNode";

function reverseList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head
  let newHead: ListNode | null = null

  while (head) {
    const current: ListNode|null = head.next
    head.next = newHead
    newHead = head
    head = current
  }
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