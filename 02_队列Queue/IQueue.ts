import { IList } from "../types/IList"
export interface IQueue<T> extends IList<T> {
  enqueue(element: T): void
  dequeue(): T | undefined
}

// export interface IQueue<T> {
//   enqueue(element: T): void
//   dequeue(): T | undefined
//   peek(): T | undefined
//   isEmpty(): boolean
//   size(): number
//   clear(): void
// }
