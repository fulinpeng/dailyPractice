
class Node {
    constructor(data){
        this.right = null;
        this.left = null;
        this.data = data;
        this.visited = false;
    }
}

class BST{
    constructor(){
        this.root = null;
    }
    insert(data){
        let newNode = new Node(data);
        if(this.root){
            const insetNode = (oldNode, newNode) => {
                if(newNode.data > oldNode.data){
                    if(oldNode.right){
                        insetNode(oldNode.right, newNode)
                    }else{
                        oldNode.right = newNode
                    }
                }else{
                    if(oldNode.left){
                        insetNode(oldNode.left, newNode)
                    }else{
                        oldNode.left = newNode
                    }
                }
            };
            insetNode(this.root, newNode)
        }else{
            this.root = newNode;
        }
    }


    // 不要在递归中使用return，不然会有意外的结果
    getMin() {
        let minNode = null;
        const getmin = (node) =>{
            if(node.left){
                getmin(node.left);
            }else{
                minNode = node;
            }
        };
        getmin(this.root);
        return minNode
    }

    getMax() {
        let maxNode = null;
        const getmax = (node) =>{
            if(node.right){
                getmax(node.right);
            }else{
                maxNode = node;
            }
        };
        getmax(this.root);
        return maxNode
    }

    findNode(value) {
        let relNode = null;
        const findnode = (node) => {
            if(value > node.data){
                if(node.right){
                    findnode(node.right)
                }else{
                    relNode = `${value}不存在`;
                }
            }else if(value < node.data){
                if(node.left){
                    findnode(node.left)
                }else{
                    relNode = `${value}不存在`;
                }
            }else{
                relNode = node;
            }
        };
        findnode(this.root);
        return relNode
    }


    // 中序遍历递归算法
    inOrder(){
        let backs = [];
        const inOrderNode = (node,callback) => {
            if(node !== null){
                inOrderNode(node.left,callback);
                backs.push(callback(node.data));
                inOrderNode(node.right,callback)
            }
        };
        inOrderNode(this.root,callback);
        function callback(v){
            return v
        }
        return backs
    }


    // 中序遍历非递归算法（采用栈实现）
    inOrder2() {
        let stackArr = [];
        let resArr = [];

        const pushStackArr = (node) => {
            stackArr.push(node);
            while (node.left){
                node = node.left;
                stackArr.push(node);
            }
        };

        const pushResArr = () => {
            while (stackArr.length > 0){
                let popNode = stackArr.pop();
                resArr.push(popNode);
                if(popNode.right && popNode){
                    pushStackArr(popNode.right)
                }
            }
        };

        pushStackArr(this.root);
        pushResArr();
        return resArr
    }

    // 先序遍历非递归算法（采用栈实现）
    preOrder() {
        let stackArr = [];
        let resArr = [];
        const pushStackArr = (node) => {
            stackArr.push(node);
            resArr.push(node);
            while (node.left) {
                node = node.left;
                stackArr.push(node);
                resArr.push(node);
            }
        };

        const pushResArr = () => {
          while(stackArr.length > 0){
              let popNode = stackArr.pop();
              if(popNode.right){
                  pushStackArr(popNode.right)
              }
          }
        };

        pushStackArr(this.root);
        pushResArr();
        return resArr
    }

    // 后序遍历非递归算法（采用栈实现）
    postOrder() {
        let stackArr = [];
        let resArr = [];
        const pushStackArr = (node) => {
            stackArr.push(node);
            while (node.left) {
                node = node.left;
                stackArr.push(node);
            }
        };

        const pushResArr = () => {
            while(stackArr.length > 0){

                let lastNodeRight = stackArr[stackArr.length - 1].right,
                    popNode = null,
                    lastNode = stackArr[stackArr.length - 1].visited;

                if(lastNode){
                    popNode = stackArr.pop();
                    resArr.push(popNode);
                }else{
                    stackArr[stackArr.length - 1].visited = true;
                    if(lastNodeRight){
                        pushStackArr(lastNodeRight);
                    }else{
                        popNode = stackArr.pop();
                        resArr.push(popNode);
                    }
                }
            }
        };
        pushStackArr(this.root);
        pushResArr();
        return resArr
    }
}

let bst = new BST();
[7,10,5,8,3,2,11,1,4].forEach(item => {
    bst.insert(item);
});
console.log(bst);

console.log(bst.getMin());

console.log(bst.getMax());

console.log(bst.findNode(6));

console.log(bst.inOrder2());

console.log(bst.preOrder());

console.log(bst.postOrder());
