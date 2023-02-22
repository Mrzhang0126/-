class Graph<T> {
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
}

export default Graph
