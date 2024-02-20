class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
  
  addAdjacent(node) {
    this.adjacent.add(node);
  }
  
  removeAdjacent(node) {
    this.adjacent.delete(node);
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  addVertices(nodesArray) {
    for (const node of nodesArray) {
      this.nodes.add(node);
    }
  }

  addEdge(v1, v2) {
    if (this.nodes.has(v1) && this.nodes.has(v2)) {
      v1.addAdjacent(v2);
      v2.addAdjacent(v1);
    }
  }

  removeEdge(v1, v2) {
    if (this.nodes.has(v1) && this.nodes.has(v2)) { // Corrected from node1 to v1
      v1.removeAdjacent(v2);
      v2.removeAdjacent(v1);
    }
  }

  removeVertex(vertex) {
    if (!this.nodes.has(vertex)) return;

    for (const adjNode of vertex.adjacent) {
      adjNode.removeAdjacent(vertex);
    }

    this.nodes.delete(vertex);
  }

  depthFirstSearch(start) {
    let visited = new Set();
    let stack = [start];
    let result = [];

    while (stack.length > 0) {
      let node = stack.pop();

      if (!visited.has(node)) {
        visited.add(node);
        result.push(node.value);

        node.adjacent.forEach(adjNode => {
          if (!visited.has(adjNode)) {
            stack.push(adjNode);
          }
        });
      }
    }
    return result; // Correctly moved outside the while loop
  }

  breadthFirstSearch(start) {
    let visited = new Set([start]);
    let queue = [start];
    let result = [];

    while (queue.length > 0) {
      let node = queue.shift();
      result.push(node.value);

      node.adjacent.forEach(adjNode => {
        if (!visited.has(adjNode)) {
          visited.add(adjNode);
          queue.push(adjNode);
        }
      });
    }

    return result;
  }
}

module.exports = { Graph, Node };
