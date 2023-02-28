import TreeNode from './TreeNode'

function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null

  const stack = [root]
  while (stack.length) {
    const node = stack.pop()!

    const lNode = node.left
    node.left = node.right
    node.right = lNode

    if (node.left) stack.push(node.left)
    if (node.right) stack.push(node.right)
  }


  return root
}
