class Node<T> {
  value: T
  constructor(value: T) {
    this.value = value
  }
}

export class TreeNode<T> extends Node<T> {
  left: TreeNode<T> | null = null
  right: TreeNode<T> | null = null

  // 当前节点的父节点
  parent: TreeNode<T> | null = null

  // 判断当前节点是父节点的左子节点
  get isLeft(): boolean {
    return !!(this.parent && this.parent.left === this)
  }

  // 判断当前节点是父节点的右子节点
  get isRight(): boolean {
    return !!(this.parent && this.parent.right === this)
  }
}

export class BSTree<T> {
  protected root: TreeNode<T> | null = null

  print() {
    // btPrint(this.root)
  }

  private searchNode(value: T): TreeNode<T> | null {
    let current = this.root
    let parent: TreeNode<T> | null = null
    while (current) {
      // 1.如果找到current, 直接返回即可
      if (current.value === value) {
        return current
      }

      // 2.继续向下找
      parent = current
      if (current.value < value) {
        current = current.right
      } else {
        current = current.left
      }

      // 如果current有值, 那么current保存自己的父节点
      if (current) current.parent = parent
    }

    return null
  }
  
  protected createNode(value: T): TreeNode<T> {
    return new TreeNode(value)
  }

  protected checkBalance(node: TreeNode<T>, isAdd = true) {}

  /** 插入数据的操作 */
  insert(value: T) {
    // 1.根据传入value创建Node(TreeNode)节点
    const newNode = this.createNode(value)

    // 2.判断当前是否已经有了根节点
    if (!this.root) { // 当前树为空
      this.root = newNode
    } else { // 树中已经有其他值
      this.insertNode(this.root, newNode)
    }

    // 3.检测树是否平衡
    this.checkBalance(newNode)
  }

  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>) {
    if (newNode.value < node.value) { // 去左边继续查找空白位置
      if (node.left === null) { // node节点的左边已经是空白
        node.left = newNode
        newNode.parent = node
      } else {
        this.insertNode(node.left, newNode)
      }
    } else { // 去右边继续查找空白位置
      if (node.right === null) {
        node.right = newNode
        newNode.parent = node
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }

  /** 遍历的操作 */
  // 先序遍历
  preOrderTraverse() {
    this.preOrderTraverseNode(this.root)
  }
  private preOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      console.log(node.value)
      this.preOrderTraverseNode(node.left)
      this.preOrderTraverseNode(node.right)
    }
  }

  // 中序遍历
  inOrderTraverse() {
    this.inOrderTraverseNode(this.root)
  }
  private inOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      this.inOrderTraverseNode(node.left)
      console.log(node.value)
      this.inOrderTraverseNode(node.right)
    }
  }

  // 后序遍历
  postOrderTraverse() {
    this.postOrderTraverseNode(this.root)
  }
  private postOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      this.postOrderTraverseNode(node.left)
      this.postOrderTraverseNode(node.right)
      console.log(node.value)
    }
  }

  // 层序遍历
  levelOrderTraverse() {
    // 1.如果没有根节点, 那么不需要遍历
    if (!this.root) return

    // 2.创建队列结构
    const queue: TreeNode<T>[] = []
    // 第一个节点时根节点
    queue.push(this.root)

    // 3.遍历队列中所有的节点(依次出队)
    while (queue.length) {
      // 3.1.访问节点的过程
      const current = queue.shift()!
      console.log(current.value)

      // 3.2.将左子节点放入到队列
      if (current.left) {
        queue.push(current.left)
      }

      // 3.3.将右子节点放入到队列
      if (current.right) {
        queue.push(current.right)
      }
    }
  }


  /** 获取最值操作: 最大值/最小值 */
  getMaxValue(): T | null {
    let current = this.root
    while (current && current.right) {
      current = current.right
    }

    return current?.value ?? null
  }

  getMinValue(): T | null {
    let current = this.root
    while (current && current.left) {
      current = current.left
    }

    return current?.value ?? null
  }

  /** 搜索特定的值: 20 => boolean */
  search(value: T): boolean {
    return !!this.searchNode(value)
  }


  /** 实现删除操作 */
  private getSuccessor(delNode: TreeNode<T>): TreeNode<T> {
    // 获取右子树
    let current = delNode.right
    let successor: TreeNode<T> | null = null
    while (current) {
      successor = current
      current = current.left
      if (current) {
        current.parent = successor
      }
    }

    // 拿到了后继节点
    if (successor !== delNode.right) {
      successor!.parent!.left = successor!.right
      if (successor?.right) {
        successor.right.parent = successor.parent
      }
    } else {
      delNode.right = successor!.right
      if (successor!.right) {
        successor!.right.parent = delNode
      }
    }

    // 一定要进行的操作: 将删除节点的left, 赋值给后继节点的left
    // successor!.left = delNode.left

    return successor!
  }

  remove(value: T): boolean {
    // 1.搜索: 当前是否有这个value
    const current = this.searchNode(value)
    if (!current) return false

    let delNode: TreeNode<T> = current

    // 2.获取到三个东西: 当前节点/父节点/是属于父节点的左子节点, 还是右子节点
    let replaceNode: TreeNode<T> | null = null
    if (current.left === null && current.right === null) {
      replaceNode = null
    } else if (current.right === null) {
      replaceNode = current.left
    } else if (current.left === null) {
      replaceNode = current.right
    } else {
      const successor = this.getSuccessor(current)
      current.value = successor.value
      delNode = successor
      this.checkBalance(delNode, false)
      return true
    }

    if (current === this.root) {
      this.root = replaceNode
    } else if (current.isLeft) {
      current.parent!.left = replaceNode
    } else {
      current.parent!.right = replaceNode
    }

    // 判断replaceNode
    if (replaceNode && current.parent) {
      replaceNode.parent = current.parent
    }


    // 删除完成后, 检测树是否平衡(传入的节点是那个真正从二叉树中被移除的节点)
    this.checkBalance(delNode, false)

    return true
  }
}

export default BSTree

