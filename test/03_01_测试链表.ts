import LinkedList from '../03_链表LinkedList/01_设计链表';
// import LinkedList from './03_00_测试实现链表';

const linkedList = new LinkedList<string>()
const start = performance.now()
console.log('------------ 测试append ------------')
linkedList.append("aaa")
linkedList.append("bbb")
linkedList.append("ccc")
linkedList.append("ddd")
linkedList.toString()

console.log('------------ 测试insert ------------')
linkedList.insert("abc", 0)
linkedList.toString()
linkedList.insert("cba", 2)
linkedList.insert("nba", 6)
linkedList.toString()

// 测试删除节点
console.log('------------ 测试removeAt ------------')
linkedList.removeAt(2)
linkedList.removeAt(0)
linkedList.toString()

console.log(linkedList.removeAt(2))
linkedList.toString()
console.log(linkedList.removeAt(4))
linkedList.toString()

console.log('------------ 测试get ------------')
console.log(linkedList.get(0))
console.log(linkedList.get(1))
console.log(linkedList.get(3))
console.log(linkedList.get(4))

console.log('------------ 测试update ------------')
linkedList.update(1, "why")
linkedList.update(2, "kobe")
linkedList.toString()

console.log('------------ 测试indexOf ------------')
console.log(linkedList.indexOf("cba"))
console.log(linkedList.indexOf("why"))
console.log(linkedList.indexOf("kobe"))
console.log(linkedList.indexOf("james"))
const end = performance.now()
console.log(`消耗时间: ${end - start}`)
// console.log('------------ 测试remove ------------')
// linkedList.remove("why")
// linkedList.remove("cba")
// linkedList.remove("kobe")
// linkedList.toString()
// console.log(linkedList.isEmpty())


// console.log('------------ 测试clear ------------')
// linkedList.clear()
// linkedList.toString()