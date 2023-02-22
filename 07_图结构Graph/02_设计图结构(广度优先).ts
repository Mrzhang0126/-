class Graph<T = any> {
  private verteces: T[] = []
  private adjList: Map<T, T[]> = new Map()

  addVertex(vertex: T) {
    this.verteces.push(vertex)
    this.adjList.set(vertex, [])
  }

  addEdge(v1: T, v2: T) {
    this.adjList.get(v1)?.push(v2)
    this.adjList.get(v2)?.push(v1)
  }

  toString() {
    const values: string[] = []
    for (const vertex of this.verteces) {
      const edges = this.adjList.get(vertex) ?? []
      const r = `${vertex} -> ${edges?.join(" ")}`
      values.push(r)
      console.log(r)
    }
    return values
  }

  bfs() {
    if (this.verteces.length === 0) return
    const queue: T[] = [], result: T[] = []
    queue.push(this.verteces[0])

    const visited = new Set<T>()
    visited.add(this.verteces[0])

    while (queue.length) {
      const vertex = queue.shift()!
      result.push(vertex)

      const neighbors = this.adjList.get(vertex)
      if (!neighbors || !neighbors.length) continue
      for (const n of neighbors) {
        if (!visited.has(n)) {
          visited.add(n)
          queue.push(n)
        }
      }
    }

    return result
  }
}

export default Graph
