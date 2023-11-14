var tree = new TreeNode(0);
tree.left = new TreeNode(1);
tree.right = new TreeNode(2);
tree.left.left = new TreeNode(3);
tree.left.left.left = new TreeNode(7);
tree.left.right = new TreeNode(4);
tree.right.left = new TreeNode(5);
tree.right.right = new TreeNode(6);
var preorderTraversal = function (root) {
    var res = [];
    var temp = [];
    var cur = root;
    while (temp.length || cur) {
        res.push(cur.val);
        cur.right && temp.push(cur.right);
        if (cur.left) {
            cur = cur.left;
        } else {
            cur = temp.pop();
        }
    }
    return res;
};
var preorderTraversal = function (root) {
    var res = [];
    var temp = [root];
    var cur = null;
    while (temp.length) {
        cur = temp.pop();
        if (cur) {
            res.push(cur.val);
            temp.push(cur.right, cur.left);
        }
    }
    return res;
};
console.log(preorderTraversal(tree));
