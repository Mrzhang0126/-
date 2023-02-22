class HashTable<T = any> {
  private readonly MIN_CAPACITY_SIZE = 7
  private readonly ENLARGE_FACTOR = 0.75
  private readonly SHRINK_FACTOR = 0.25
  private length: number = this.MIN_CAPACITY_SIZE // 数组长度
  private count: number = 0 
  public table: [string, T][][] = new Array(this.length) // 存放链地址法中数组(或链表)

  private hashCode(str: string) {
    let hash = 0, len = str.length
    for (let i = 0; i < len; i++) {
      hash = 31 * hash + str.charCodeAt(i)
    }
    return hash
  }
  hash(key: string, max = this.length) {
    return (this.hashCode(key) & 0x7FFFFFFF) % max
  }

  private isPrime(num: number): boolean {
    const sqrt = ~~Math.sqrt(num) 
    for (let i = 2; i <= sqrt; i++) {
      if (num % i === 0) {
        return false
      }
    }
    return true
  }

  getNextPrime(num: number): number {
    let newPrime = num
    while (!this.isPrime(newPrime)) {
      newPrime++
    }
    return newPrime
  }

  rehash(len: number) {
    let newPrime = this.getNextPrime(len)
    if (newPrime < this.MIN_CAPACITY_SIZE) {
      newPrime = this.MIN_CAPACITY_SIZE
    }
    this.length = newPrime

    const oldTable = this.table
    this.table = new Array(this.length)
    this.count = 0

    for (const bucket of oldTable) {
      if (!bucket || !bucket.length) continue
      for (let i = 0; i < bucket.length; i++) {
        const [key, value] = bucket[i]
        this.put(key, value)
      }
    }
  }

  put(key: string, value: T) {
    const index = this.hash(key)
    let bucket = this.table[index]
    if (!bucket) this.table[index] = bucket = []
    let isUpdate = false
    for (let i = 0, len = bucket.length; i < len; i++) {
      const [k] = bucket[i]
      if (key === k) {
        bucket[i][1] = value
        isUpdate = true
      }
    }

    if (!isUpdate) {
      bucket.push([key, value])
      this.count++

      const loadFactor = this.count / this.length
      if (loadFactor > this.ENLARGE_FACTOR) {
        this.rehash(this.length * 2)
      }
    }
  }

  get(key: string): T | undefined {
    const index = this.hash(key)
    const bucket = this.table[index]
    if (!bucket) return undefined

    for (let i = 0, len = bucket.length; i < len; i++) {
      const [k, v] = bucket[i]
      if (key === k) {
       return v
      }
    }
    return undefined
  }

  delete(key: string): T | undefined {
    const index = this.hash(key)
    let bucket = this.table[index]
    if (!bucket) return undefined

    for (let i = 0, len = bucket.length; i < len; i++) {
      const [k, v] = bucket[i]
      if (key === k) {
        bucket.splice(i, 1)
        this.count--

        const loadFactor = this.count / this.length
        if (loadFactor < this.SHRINK_FACTOR && this.length > this.MIN_CAPACITY_SIZE) {
          this.rehash(this.length >>> 1)
        }

        return v
      }
    }
    return undefined
  }
  
  get loadFactor(): number {
    console.log('元素数量:', this.count)
    console.log('数组长度:', this.length)
    return this.count / this.length
  }
  get size(): number {
    return this.count
  }

  clear() {
    this.length = this.MIN_CAPACITY_SIZE
    this.table = new Array(this.length)
    this.count = 0
  }
}

export default HashTable
