import ListNode from "./ListNode";

function reverseList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head

  let newHead: ListNode | null = null
  while (head) {
    const current: ListNode | null = head.next
    head.next = newHead
    newHead = head
    head = current
  }
  return newHead
}

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
