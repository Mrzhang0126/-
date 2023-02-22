import LinkedList from "./01_LinkedList";

class CircularLinkedList<T> extends LinkedList<T> {
  append(value: T): void {
    super.append(value)
    this.tail!.next = this.head
  }

  insert(index: number, value: T): boolean {
    const is = super.insert(index, value)
    if (is && (index === this.N - 1 || index === 0)) {
      this.tail!.next = this.head
    }
    return is
  }

  removeAt(index: number): T | null {
    const value = super.removeAt(index)
    if (value && this.tail && (index === this.N || index === 0)) {
      this.tail.next = this.head
    }
    return value
  }
}

export default CircularLinkedList
