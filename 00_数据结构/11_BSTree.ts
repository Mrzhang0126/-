class TreeNode<T> {
  value: T
  left: TreeNode<T> | null = null
  right: TreeNode<T> | null = null
  parent: TreeNode<T> | null = null

  constructor(value: T) {
    this.value = value
  }
  get isLeft(): boolean {
    return !!(this.parent && this.parent.left === this)
  }

  get isRight(): boolean {
    return !!(this.parent && this.parent.right === this)
  }
}

class BSTree<T> {
  protected root: TreeNode<T> | null = null

  insert(value: T) {
    const node = new TreeNode(value)
    if (!this.root) {
      this.root = node
    } else {
      this.insertNode(this.root, node)
    }
  }

  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>) {
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

  preOrderTraverseNode(node: TreeNode<T> | null, values: T[]) {
    // if (node) {
    //   values.push(node.value)
    //   this.preOrderTraverseNode(node.left, values)
    //   this.preOrderTraverseNode(node.right, values)
    // }

    let stack: TreeNode<T>[] = [], current: TreeNode<T>|null = node
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

  private inOrderTraverseNode(node: TreeNode<T> | null, values: T[]) {
    // if (node) {
    //   this.inOrderTraverseNode(node.left, values)
    //   values.push(node.value)
    //   this.inOrderTraverseNode(node.right, values)
    // }

    let stack: TreeNode<T>[] = [], current: TreeNode<T>|null = node
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

  private postOrderTraverseNode(node: TreeNode<T> | null, values: T[]) {
    // if (node) {
    //   this.postOrderTraverseNode(node.left, values)
    //   this.postOrderTraverseNode(node.right, values)
    //   values.push(node.value)
    // }

    let stack: TreeNode<T>[] = [], current: TreeNode<T>|null = node
    let lastVisitedNode: TreeNode<T>|null = null

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
    const queue: TreeNode<T>[] = []
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

  private searchNode(node: TreeNode<T>|null, value: T): TreeNode<T> | null {
    let current: TreeNode<T> | null = node, parent: TreeNode<T> | null = null
    while (current) {
      if (current.value === value) {
        return current
      }

      parent = current
      if (current.value < value) {
        current = current.right
      } else {
        current = current.left
      }
      if (current) current.parent = parent
    }
    return null
  }

  search(value: T) {
    return this.searchNode(this.root, value)
  }
  // ????????????
  predecessorNode(node: TreeNode<T>): TreeNode<T>|null {
    if (!node) return null
    let current = node.left, parent: TreeNode<T> | null = null
    while (current && current.right) {
      parent = current
      current = current.right
    }
    current!.parent = parent

    return current!
  }

  // ???????????????(??????)??????
  successorNode(node: TreeNode<T>): TreeNode<T>|null {
    if (!node) return null
    let current = node.right, successor: TreeNode<T> | null = null
    while (current) {
      successor = current
      current = current.left
      if (current) current.parent = successor
    }

    if (successor !== node.right) {
      successor!.parent!.left = successor!.right
      successor!.right = node.right
    }

    successor!.left = node.left

    return successor!
  }

  remove(value: T): TreeNode<T>|null {
    let current = this.search(value)
    if (!current) return null
    // ??????????????????
    let replaceNode: TreeNode<T>|null = null 
    if (!current.left && !current.right) { // ????????????
      replaceNode = null
    } else if (!current.right) {
      replaceNode = current.left
    } else if (!current.left) {
      replaceNode = current.right
    } else {
      replaceNode = this.successorNode(current)
    }

    if (current === this.root) {
      this.root = replaceNode
    } else if (current.isLeft) {
      current.parent!.left = replaceNode
    } else if (current.isRight) {
      current.parent!.right = replaceNode
    }
    return replaceNode
  }

  remove2(value: T): TreeNode<T>|null {
    this.root = this.removeNode(this.root, value)
    return this.root
  }

  removeNode(root: TreeNode<T>|null, key: T): TreeNode<T>|null {
    let cur = root, curParent: TreeNode<T>|null = null
    while (cur && cur.value !== key) {
      curParent = cur
      if (cur.value > key) {
        cur = cur.left
      } else {
        cur = cur.right
      }
    }
    if (!cur) return root
    if (!cur.left && !cur.right) {
      cur = null
    } else if (!cur.right) {
      cur = cur.left
    } else if (!cur.left) {
      cur = cur.right
    } else {
      let successor = cur.right, successorParent = cur;
      while (successor.left) {
        successorParent = successor
        successor = successor.left
      }
      if (successorParent.value === cur.value) {
        successorParent.right = successor.right
      } else {
        successorParent.left = successor.right
      }
      successor.right = cur.right
      successor.left = cur.left
      cur = successor
    }
    if (!curParent) {
      return cur
    } else {
      if (curParent.left && curParent.left.value === key) {
        curParent.left = cur
      } else {
        curParent.right = cur
      }
      return root
    }
  }
}

export default BSTree
