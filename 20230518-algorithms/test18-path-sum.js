/*https://leetcode.cn/problems/path-sum/

给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。如果存在，返回 true ；否则，返回 false 。

叶子节点 是指没有子节点的节点。
*/
var hasPathSum = function (root, targetSum) {
    if (!root) return false;
    if (!root.left && !root.right) {
        return root.val === targetSum;
    }
    let stak = [{ preSum: root.val, node: root }];
    while (stak.length) {
        let { preSum, node: curNode } = stak.pop();
        let curSum = preSum + curNode.val;
        if (curNode.right) {
            stak.push({ preSum: curSum, node: curNode.right });
        }
        if (curNode.left) {
            stak.push({ preSum: curSum, node: curNode.left });
        }
        if (!curNode.right && !curNode.left && curSum === targetSum) return true;
    }
    return false;
};
