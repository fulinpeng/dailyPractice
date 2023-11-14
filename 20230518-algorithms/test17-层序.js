// https://leetcode.cn/problems/binary-tree-level-order-traversal/submissions/
var levelOrder = function (root) {
    if (!root || root.length <= 1) return [];
    let queue = [{ node: root, level: 0 }];
    let temp = [];
    while (queue.length) {
        let { node, level } = queue.shift();
        (temp[level] || (temp[level] = [])).push(node.val);
        node.left && queue.push({ node: node.left, level: level + 1 });
        node.right && queue.push({ node: node.right, level: level + 1 });
    }
    return temp;
};
