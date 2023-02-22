import { btPrint } from './print'
class Node<T> {
  value: T
  left: Node<T> | null = null
  right: Node<T> | null = null
  parent: Node<T> | null = null

  constructor(value: T) {
    this.value = value
  }
  // get isLeft(): boolean {
  //   return !!(this.parent && this.parent.left === this)
  // }

  // get isRight(): boolean {
  //   return !!(this.parent && this.parent.right === this)
  // }
}

class BSTree<T> {
  private root: Node<T> | null = null

  print() {
    btPrint(this.root)
  }

  insert(value: T) {
    const node = new Node(value)
    if (!this.root) {
      this.root = node
    } else {
      this.insertNode(this.root, node)
    }
  }

  private insertNode(node: Node<T>, newNode: Node<T>) {
    if (newNode.value < node.value) {
      if (!node.left) {
        node.left = newNode
      } else {
        this.insertNode(node.left, newNode)
      }
    } else {
      if (!node.right) {
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }

  preOrderTraverse(node = this.root): T[] {
    const res: T[] = []
    this.preOrderTraverseNode(node, res)
    return res
  }

  preOrderTraverseNode(node: Node<T> | null, values: T[]) {
    // if (node) {
    //   values.push(node.value)
    //   this.preOrderTraverseNode(node.left, values)
    //   this.preOrderTraverseNode(node.right, values)
    // }

    let stack: Node<T>[] = [], current: Node<T>|null = node
    while (current || stack.length) {
      while (current) {
        values.push(current.value)
        stack.push(current)
        current = current.left
      }
      current = stack.pop()!
      current = current.right
    }
  }

  inOrderTraverse(node = this.root): T[] {
    const res: T[] = []
    this.inOrderTraverseNode(node, res)
    return res
  }

  private inOrderTraverseNode(node: Node<T> | null, values: T[]) {
    // if (node) {
    //   this.inOrderTraverseNode(node.left, values)
    //   values.push(node.value)
    //   this.inOrderTraverseNode(node.right, values)
    // }

    let stack: Node<T>[] = [], current: Node<T>|null = node
    while (current || stack.length) {
      while (current) {
        stack.push(current)
        current = current.left
      }
      current = stack.pop()!
      values.push(current.value)
      current = current.right
    }
  }

  postOrderTraverse(node = this.root): T[] {
    const res: T[] = []
    this.postOrderTraverseNode(node, res)
    return res
  }

  private postOrderTraverseNode(node: Node<T> | null, values: T[]) {
    // if (node) {
    //   this.postOrderTraverseNode(node.left, values)
    //   this.postOrderTraverseNode(node.right, values)
    //   values.push(node.value)
    // }

    let stack: Node<T>[] = [], current: Node<T>|null = node
    let lastVisitedNode: Node<T>|null = null

    while (current || stack.length) {
      while (current) {
        stack.push(current)
        current = current.left
      }
      current = stack[stack.length - 1]
      if (!current.right || current.right === lastVisitedNode) {
        values.push(current.value)
        lastVisitedNode = current
        stack.pop()
        current = null
      } else {
        current = current.right
      }
    }
  }

  levelOrderTraverse(node = this.root): T[] {
    const res: T[] = []
    if (!node) return res
    const queue: Node<T>[] = []
    queue.push(node)
    while (queue.length) {
      const current = queue.shift()!
      res.push(current.value)
      current.left && queue.push(current.left)
      current.right && queue.push(current.right)
    }
    return res
  }

  maxValue(): T | null {
    let current = this.root
    while (current && current.right) {
      current = current.right
    }
    return current?.value ?? null
  }

  minValue(): T | null {
    let current = this.root
    while (current && current.left) {
      current = current.left
    }
    return current?.value ?? null
  }

  private searchNode(node: Node<T>|null, value: T): [Node<T> | null, Node<T> | null] {
    let current = node, parent: Node<T> | null = null
    while (current) {
      if (current.value === value) {
        return [current, parent]
      }

      parent = current
      if (current.value < value) {
        current = current.right
      } else {
        current = current.left
      }
      if (current) current.parent = parent
    }
    return [null, parent]
  }

  getParentNode(value: T): Node<T> | null {
    return this.searchNode(this.root, value)[1]
  }

  search(value: T) {
    return this.searchNode(this.root, value)[0]
  }

  // 获取后继或(前驱)节点
  getSuccessorNode(node: Node<T>): Node<T> {
    let successor = node.right
    return successor!
  }

  remove(value: T) { 
    this.removeNode(this.root, value)
    // let current: Node<T>|null = this.searchNode(value)
    // if (!current) return false

    // return false
  }

  removeNode(node: Node<T>|null, value: T) {
    if (!node) return false
    if (!node.left && !node.right) {

    }
  }
}


export default BSTree
// export default BinarySearchTree