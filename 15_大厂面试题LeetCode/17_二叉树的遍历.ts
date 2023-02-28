import TreeNode from "./TreeNode";

function preOrderTraverse(node: TreeNode) {
  const stack: TreeNode[] = [], values: any[] = []
  let current: TreeNode|null = node
  while (current || stack.length) {
    while (current) {
      values.push(current.val)
      stack.push(current)
      current = current.left
    }
    current = stack.pop()!
    current = current.right
  }
  return values
}

function inOrderTraverse(node: TreeNode) {
  const stack: TreeNode[] = [], values: any[] = []
  let current: TreeNode | null = node
  while (current || stack.length) {
    while (current) {
      stack.push(current)
      current = current.left
    }
    current = stack.pop()!
    values.push(current.val)
    current = current.right
  }
  return values
}

function postOrderTraverse(node: TreeNode) {
  const stack: TreeNode[] = [], values: any[] = []
  let current: TreeNode|null = node
  let lastNode: TreeNode|null = null

  while(current || stack.length) {
    while(current) {
      stack.push(current)
      current = current.left
    }
    current = stack[stack.length-1]
    if (!current.right || current.right === lastNode) {
      values.push(current.val)
      lastNode = current
      stack.pop()
      current = null
    } else {
      current = current.right
    }
  }
  return values
}

function levelOrderTraverse(node: TreeNode) {
  const queue: TreeNode[] = [], values: any[] = []
  queue.push(root)
  while (queue.length) {
    const n = queue.shift()!
    values.push(n.val)
    n.left && queue.push(n.left)
    n.right && queue.push(n.right)
  }
  return values
}


const root: TreeNode = {
  val: 1,
  left: {
    val: 2, 
    left: {
      val: 4,
      right: {
        val: 6,
        left: {
          val: 7,
          right: null,
          left: null
        },
        right: {
          val: 8,
          left: null,
          right: null
        }
      },
      left: null
    },
    right: null
  },
  right: {
    val: 3,
    right: {
      val: 5,
      left: null,
      right: null
    },
    left: null
  }
}


// console.log(preOrderTraverse(root))

// console.log(inOrderTraverse(root))
console.log(levelOrderTraverse(root))
console.log(postOrderTraverse(root))




