// https://leetcode.cn/problems/clone-graph/
var cloneGraph = function (node) {
    if (!node) return null;
    let visited = new Map();
    let stack = [node];
    visited.set(node, new Node(node.val));
    let curNode = null;
    while (stack.length) {
        curNode = stack.pop();
        for (const neighbor of curNode.neighbors) {
            if (!visited.has(neighbor)) {
                stack.push(neighbor);
                visited.set(neighbor, new Node(neighbor.val));
            }
            visited.get(curNode).neighbors.push(visited.get(neighbor));
        }
    }
    return visited.get(node);
};
