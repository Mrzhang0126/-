import { btPrint } from "./print"

enum Colors {
  RED = 0,
  BLACK = 1
}

class RedBlackNode<T> {
  value: T
  color: Colors
  parent: RedBlackNode<T> | null = null
  left: RedBlackNode<T> | null = null
  right: RedBlackNode<T> | null = null

  constructor(value: T, color: Colors = Colors.RED) {
    this.value = value
    this.color = color
  }

  // isRed(): boolean {
  //   return this.color === Colors.RED
  // }

  // flipColor() {
  //   this.color = 1 ^ this.color
  // }
}

class RedBlackTree<T> {
  root: RedBlackNode<T> | null = null

  print() {
    btPrint(this.root)
  }

  insert(value: T) {
    const node = new RedBlackNode(value)
    if (!this.root) {
      this.root = node
      node.color = Colors.BLACK
    } else {
      let current: RedBlackNode<T> | null = this.root
      let parent: RedBlackNode<T> | null = null

      while (current) {
        parent = current
        if (value < current.value) {
          current = current.left
        } else {
          current = current.right
        }
      }

      node.parent = parent
      if (value < parent!.value) {
        parent!.left = node
      } else {
        parent!.right = node
      }

      this.fixInsertion(node)
    }
  }

  fixInsertion(node: RedBlackNode<T>) {
    while (node.parent && node.parent.color === Colors.RED) {
      let grandParent = node.parent.parent!
      if (node.parent === grandParent.left) {
        let uncle = grandParent.right
        if (uncle && uncle.color === Colors.RED) {
          node.parent.color = Colors.BLACK
          uncle.color = Colors.BLACK
          grandParent.color = Colors.RED
          node = grandParent
        } else {
          if (node === node.parent.right) {
            node = node.parent
            this.leftRotate(node)
          }
          node.parent!.color = Colors.BLACK
          grandParent.color = Colors.RED
          this.rightRotate(grandParent)
        }
      } else {
        let uncle = grandParent.left
        if (uncle && uncle.color === Colors.RED) {
          node.parent.color = Colors.BLACK
          uncle.color = Colors.BLACK
          grandParent.color = Colors.RED
          node = grandParent
        } else {
          if (node === node.parent.left) {
            node = node.parent
            this.rightRotate(node)
          }
          node.parent!.color = Colors.BLACK
          grandParent.color = Colors.RED
          this.leftRotate(grandParent)
        }
      }
    }
    this.root!.color = Colors.BLACK
  }

  private leftRotate(node: RedBlackNode<T>) {
    let rightChild = node.right!
    node.right = rightChild.left

    if (rightChild.left) {
      rightChild.left.parent = node
    }

    rightChild.parent = node.parent
    if (!node.parent) {
      this.root = rightChild
    } else {
      if (node === node.parent.left) {
        node.parent.left = rightChild
      } else {
        node.parent.right = rightChild
      }
    }

    rightChild.left = node
    node.parent = rightChild
  }

  private rightRotate(node: RedBlackNode<T>) {
    let leftChild = node.left!
    node.left = leftChild.right

    if (leftChild.right) {
      leftChild.right.parent = node
    }

    leftChild.parent = node.parent
    if (!node.parent) {
      this.root = leftChild
    } else {
      if (node === node.parent.left) {
        node.parent.left = leftChild
      } else {
        node.parent.right = leftChild
      }
    }

    leftChild.right = node
    node.parent = leftChild
  }

  minimum(node: RedBlackNode<T>|null = this.root): RedBlackNode<T>|null {
    let current = node
    while (current && current.left) {
      current = current.left
    }
    return current
  }

  search(value: T): RedBlackNode<T>|null {
    let current = this.root, parent: RedBlackNode<T>|null = null
    while (current) {
      if (current.value === value) {
        current.parent = parent
        return current
      }
      parent = current
      if (value < current.value) {
        current = current.left
      } else {
        current = current.right
      }
    }
    return null
  }

  delete(value: T) {
    const node = this.search(value)
    const c = {...node}
    if (!node) return
    this.deleteNode(node)
    return c
  }

  deleteNode(node: RedBlackNode<T>) {
    if (node.left && node.right) {
      const successor = this.minimum(node.right)
      node.value = successor!.value
      node = successor!
    }

    let child: RedBlackNode<T>|null = null
    if (node.left) {
      child = node.left
    } else if (node.right) {
      child = node.right
    } else {
      child = null
    }

    if (!child) {
      if (node.color === Colors.BLACK) {
        this.deleteCase1(node)
      }
      this.removeNode(node)
    } else {
      if (node.color === Colors.BLACK) {
        if (child.color === Colors.RED) {
          child.color = Colors.BLACK
        } else {
          this.deleteCase1(node)
        }
      }
      this.replaceNode(node, child)
    }
  }

  private deleteCase1(node: RedBlackNode<T>) {
    if (node.parent) {
      this.deleteCase2(node)
    }
  }

  private deleteCase2(node: RedBlackNode<T>) {
    const sibling = this.sibling(node)
    if (sibling && sibling.color === Colors.RED) {
      node.parent!.color = Colors.RED
      sibling.color = Colors.BLACK

      if (node === node.parent!.left) {
        this.leftRotate(node.parent!)
      } else {
        this.rightRotate(node.parent!)
      }
    }
    this.deleteCase3(node)
  }

  private deleteCase3(node: RedBlackNode<T>) {
    const sibling = this.sibling(node)
    if (
      node.parent!.color === Colors.BLACK &&
      sibling &&
      sibling.color === Colors.BLACK && 
      (!sibling.left || sibling.left.color === Colors.BLACK) &&
      (!sibling.right || sibling.right.color === Colors.BLACK)
    ) {
      sibling.color = Colors.RED
      this.deleteCase1(node.parent!)
    } else {
      this.deleteCase4(node)
    }
  }

  private deleteCase4(node: RedBlackNode<T>) {
    const sibling = this.sibling(node)
    if (
      node.parent!.color === Colors.RED &&
      sibling &&
      sibling.color === Colors.BLACK &&
      (!sibling.left || sibling.left.color === Colors.BLACK) &&
      (!sibling.right || sibling.right.color === Colors.BLACK)
    ) {
      sibling.color = Colors.RED
      node.parent!.color = Colors.BLACK
    } else {
      this.deleteCase5(node)
    }
  }

  private deleteCase5(node: RedBlackNode<T>) {
    const sibling = this.sibling(node)
    if (sibling && sibling.color === Colors.BLACK) {
      if (
        node === node.parent!.left &&
        sibling.right &&
        sibling.right.color === Colors.RED
      ) {
        sibling.color = Colors.RED
        sibling.right.color = Colors.BLACK
        this.leftRotate(sibling)
      } else if (
        node === node.parent!.right &&
        sibling.left &&
        sibling.left.color === Colors.RED
      ) {
        sibling.color = Colors.RED
        sibling.left.color = Colors.BLACK
        this.rightRotate(sibling)
      }
    }
    this.deleteCase6(node)
  }

  private deleteCase6(node: RedBlackNode<T>) {
    const sibling = this.sibling(node)
    sibling!.color = node.parent!.color
    node.parent!.color = Colors.BLACK
    if (node === node.parent!.left) {
      sibling!.right!.color = Colors.BLACK
      this.leftRotate(node.parent!)
    } else {
      if (sibling?.left) {
        sibling!.left!.color = Colors.BLACK
        this.rightRotate(node.parent!)
      }
    }
  }

  private removeNode(node: RedBlackNode<T>) {
    if (!node.parent) {
      this.root = null
    } else {
      if (node === node.parent.left) {
        node.parent.left = null
      } else {
        node.parent.right = null
      }
    }
  }

  private replaceNode(oldNode: RedBlackNode<T>, newNode: RedBlackNode<T>) {
    if (!oldNode.parent) {
      this.root = newNode
    } else if (oldNode === oldNode.parent.left) {
      oldNode.parent.left = newNode
    } else {
      oldNode.parent.right = newNode
    }
    newNode.parent = oldNode.parent
  }

  private sibling(node: RedBlackNode<T>) {
    if (!node.parent) return null
    return node === node.parent.left ? node.parent.right : node.parent.left
  }
}


export default RedBlackTree
