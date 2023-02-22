import { IList } from '../types/IList';
export interface IStack<T> extends IList<T> {
  push(element: T): void
  pop(): T | undefined
}


// export interface IStack<T> {
//   push(element: T): void
//   pop(): T | undefined
//   peek(): T | undefined
//   isEmpty(): boolean
//   size(): number
//   clear(): void
// }
