import { BSTree, TreeNode } from "./13_BSTree";

class AVLTreeNode<T> extends TreeNode<T> {
  // 保证获取到的left/right节点的类型是AVLTreeNode
  left: AVLTreeNode<T> | null = null
  right: AVLTreeNode<T> | null = null
  parent: AVLTreeNode<T> | null = null

  // height: number = 1

  /** 获取每个节点的高度 */
  private getHeight(): number {
    const leftHeight = this.left ? this.left.getHeight(): 0
    const rightHeight = this.right ? this.right.getHeight(): 0

    return Math.max(leftHeight, rightHeight) + 1
  }

  /** 权重: 平衡因子(左边height - 右边height) */
  private getBalanceFactor(): number {
    const leftHeight = this.left ? this.left.getHeight(): 0
    const rightHeight = this.right ? this.right.getHeight(): 0

    return leftHeight - rightHeight
  }

  /** 直接判断当前节点是否平衡 */
  get isBalanced(): boolean {
    const factor = this.getBalanceFactor()
    return factor >= -1 && factor <= 1 // -1 0 1
    // return Math.abs(factor) <= 1
  }



  /** 获取更高子节点 */
  public get higherChild(): AVLTreeNode<T> | null {
    const leftHeight = this.left ? this.left.getHeight(): 0
    const rightHeight = this.right ? this.right.getHeight(): 0

    if (leftHeight > rightHeight) return this.left
    if (leftHeight < rightHeight) return this.right
    return this.isLeft ? this.left: this.right
  }


  /** 旋转操作: 右旋转 */
  rightRotation() {
    const isLeft = this.isLeft
    const isRight = this.isRight

    // 1.处理pivot节点
    const pivot = this.left!
    pivot.parent = this.parent

    // 2.处理pivot的right
    this.left = pivot.right
    if (pivot.right) {
      pivot.right.parent = this
    }

    // 3.处理this
    pivot.right = this
    this.parent = pivot

    // 4.挂载pivot
    if (!pivot.parent) { // pivot直接作为tree的根
      return pivot
    } else if (isLeft) { // pivot作为父节点的左子节点
      pivot.parent.left = pivot
    } else if (isRight) { // pivot作为父节点的右子节点
      pivot.parent.right = pivot
    }

    return pivot
  }

  leftRotation() {
    const isLeft = this.isLeft
    const isRight = this.isRight

    // 1.处理pivot
    const pivot = this.right!
    pivot.parent = this.parent

    // 2.处理pivot的left
    this.right = pivot.left
    if (pivot.left) {
      pivot.left.parent = this
    }

    // 3.处理root(this)
    pivot.left = this
    this.parent = pivot

    // 4.挂载整颗子树pivot
    if (!pivot.parent) {
      return pivot
    } else if (isLeft) {
      pivot.parent.left = pivot
    } else if (isRight) {
      pivot.parent.right = pivot
    }

    return pivot
  }
}

class AVLTree<T> extends BSTree<T> {
  // 重写调用的createNode方法
  protected createNode(value: T): TreeNode<T> {
    return new AVLTreeNode(value)
  }

  // 如何去找到不平衡的节点
  checkBalance(node: AVLTreeNode<T>, isAdd = true) {
    let current = node.parent
    while (current) {
      if (!current.isBalanced) {
        this.rebalance(current)
        // 这个位置时旋转完成后的操作
        // break决定不会进一步去查找父节点有没有平衡的情况了
        // 添加的情况是不需要进一步向上查找的, 直接break
        // 删除的情况是需要进一步向上查找的, 不能break
        if (isAdd) break
      }
      current = current.parent
    }
  }

  // 假设已经找到了, 那么我们如何让这个节点变的平衡
  /**
   * 根据不平衡的节点的情况(LL/RR/LR/RL)让子树平衡
   * @param root 找到的不平衡的节点
   */
  rebalance(root: AVLTreeNode<T>) {
    const pivot = root.higherChild
    const current = pivot?.higherChild

    let resultNode: AVLTreeNode<T> | null = null
    if (pivot?.isLeft) { // L: left
      if (current?.isLeft) { // LL: left left
        resultNode = root.rightRotation()
      } else { // LR: left right
        pivot.leftRotation()
        resultNode = root.rightRotation()
      }
    } else { // R: right
      if (current?.isLeft) { // RL: right left
        pivot?.rightRotation()
        resultNode = root.leftRotation()
      } else { // RR: right right
        resultNode = root.leftRotation()
      }
    }

    // 判断返回的pivot是否有父节点
    if (!resultNode.parent) {
      this.root = resultNode
    }
  }
}

export default AVLTree





