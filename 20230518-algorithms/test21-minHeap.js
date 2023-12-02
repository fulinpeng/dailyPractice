/*
给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。

示例 1:

输入: [3,2,1,5,6,4], k = 2
输出: 5
示例 2:

输入: [3,2,3,1,2,4,5,5,6], k = 4
输出: 4
*/

var findKthLargest = function (nums, k) {
    if (!nums || !nums.length) return null;
    let res = [];
    let heap = new MinHeap();
    for (let num of nums) {
        heap.insert(num);
    }
    for (let i = 0; i < k; i++) {
        res.push(heap.pop());
    }
    return res;
};

// var res = findKthLargest([0, 1, 2, 3, 4, 5, 6], 5);
// console.log("🚀 ~ file: test21-minHeap.js: 前k大元素:", res);

class MaxHeap {
    constructor() {
        this.heap = [];
    }
    getSize() {
        return this.heap.length;
    }
    getParentIndex(i) {
        return Math.floor((i - 1) / 2); // (i - 1) >> 1
    }
    getLeftIndex(i) {
        return i * 2 + 1;
    }
    getRightIndex(i) {
        return i * 2 + 2;
    }
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    shiftUp(i) {
        if (i <= 0) return;
        let parentIndex = this.getParentIndex(i);
        if (this.heap[i] > this.heap[parentIndex]) {
            this.swap(i, parentIndex);
            this.shiftUp(parentIndex);
        }
    }
    shiftDown(i) {
        let leftIndex = this.getLeftIndex(i);
        let rightIndex = this.getRightIndex(i);
        let maxIndex = i;
        if (leftIndex < this.getSize() && this.heap[leftIndex] > this.heap[i]) {
            maxIndex = leftIndex;
        }
        if (rightIndex < this.getSize() && this.heap[rightIndex] > this.heap[i]) {
            maxIndex = rightIndex;
        }
        if (maxIndex !== i) {
            this.swap(i, maxIndex);
            this.shiftDown(maxIndex);
        }
    }
    pop() {
        if (this.getSize() === 0) return null;
        if (this.getSize() === 1) return this.heap.pop();
        let top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.shiftDown(0);
        return top;
    }
    insert(num) {
        this.heap.push(num);
        this.shiftUp(this.getSize() - 1);
    }
}
class MinHeap {
    constructor() {
        this.heap = [];
    }
    getSize() {
        return this.heap.length;
    }
    getParentIndex(i) {
        return Math.floor((i - 1) / 2); // (i - 1) >> 1
    }
    getLeftIndex(i) {
        return i * 2 + 1;
    }
    getRightIndex(i) {
        return i * 2 + 2;
    }
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    shiftUp(i) {
        if (i <= 0) return;
        let parentIndex = this.getParentIndex(i);
        if (this.heap[i] < this.heap[parentIndex]) {
            this.swap(i, parentIndex);
        }
        this.shiftUp(parentIndex); // // 这里，不必用 i--
    }
    shiftDown(i) {
        let leftIndex = this.getLeftIndex(i);
        let rightIndex = this.getRightIndex(i);
        if (leftIndex < this.getSize() && this.heap[leftIndex] < this.heap[i]) {
            this.swap(i, leftIndex);
            this.shiftDown(leftIndex);
        }
        if (rightIndex < this.getSize() && this.heap[rightIndex] < this.heap[i]) {
            this.swap(i, rightIndex);
            this.shiftDown(leftIndex);
        }
    }
    pop() {
        if (this.getSize() === 0) return null;
        if (this.getSize() === 1) return this.heap.pop();
        let top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.shiftDown(0);
        return top;
    }
    insert(num) {
        this.heap.push(num);
        this.shiftUp(this.getSize() - 1);
    }
}

function sort(arr) {
    let heap = new MaxHeap();
    let res = [];
    for (let item of arr) {
        heap.insert(item);
    }
    console.log("🚀 ~ file: test21-minHeap.js:142 ~ sort ~ heap:", heap.heap);
    let cur = heap.pop();
    while (typeof cur === "number") {
        res.push(cur);
        cur = heap.pop();
    }
    return res;
}
// console.log("res:", sort([1, 5, 4, 9, 7, 6, 5]));

var findKthLargest22 = function (nums, k) {
    if (!nums || !nums.length) return null;
    let res = "";
    let heap = new MaxHeap();
    for (let num of nums) {
        heap.insert(num);
    }
    let aaa = [];
    for (let i = 0; i < k; i++) {
        res = heap.pop();
        aaa.push(res);
    }
    console.log("@@@@:", aaa);
    return res;
};

class MaxHeap22 {
    constructor(heap) {
        this.heap = heap;
        this.heapSize = heap.length;
        this.buildMaxHeap();
    }

    // 构建最大堆
    buildMaxHeap() {
        for (let i = Math.floor(this.heapSize / 2) - 1; i >= 0; i--) {
            this.maxHeapify(i);
        }
    }

    //将以i为根节点的子树调整为最大堆
    maxHeapify(index) {
        let left = 2 * index + 1;
        let right = 2 * index + 2;
        let largest = index;
        if (left < this.heapSize && this.heap[left] > this.heap[largest]) largest = left;
        if (right < this.heapSize && this.heap[right] > this.heap[largest]) largest = right;
        if (largest !== index) {
            this.swapNum(index, largest);
            this.maxHeapify(largest);
        }
    }

    //交换i，j的值
    swapNum(i, j) {
        let temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    //插入一个数
    insert(num) {
        this.heap.push(num);
        this.heap.heapSize = this.heap.length;
        let index = this.heap.heapSize - 1;
        while (index != -1) {
            index = this.shiftUp(index);
        }
        console.log(this.heap);
    }

    //删除堆顶元素
    pop() {
        this.swapNum(0, this.heapSize - 1);
        this.heap.pop();
        this.heapSize = this.heap.length;
        let index = 0;
        while (1) {
            let temp = this.shiftDown(index);
            if (temp === index) break;
            else index = temp;
        }
    }

    //堆排序
    heapSort() {
        while (this.heapSize > 1) {
            this.swapNum(0, this.heapSize - 1);
            this.heapSize -= 1;
            let index = 0;
            while (1) {
                let temp = this.shiftDown(index);
                if (temp === index) break;
                else index = temp;
            }
        }
        this.heapSize = this.heap.length;
    }

    //上浮操作 - 将当前节点与父节点进行比较，如果该节点值大于父节点值，则进行交换。
    shiftUp(index) {
        let parent = Math.ceil(index / 2) - 1;
        if (this.heap[index] > this.heap[parent] && parent >= 0) {
            this.swapNum(index, parent);
            return parent;
        }
        return -1;
    }

    // 下沉操作 - 将当前节点与左右子节点进行比较，如果该节点值不是最大，则进行交换
    shiftDown(index) {
        let left = Math.floor(index * 2) + 1;
        let right = left + 1;
        let largest = index;
        if (left < this.heapSize && this.heap[left] > this.heap[largest]) largest = left;
        if (right < this.heapSize && this.heap[right] > this.heap[largest]) largest = right;
        if (largest !== index) {
            this.swapNum(index, largest);
        }
        return largest;
    }
}

var fs = require("fs");

fs.readFile("./bbb.js", (err, data) => {
    nums = eval(data.toString());
    // var aaa = findKthLargest22(nums, 918);
    var result = sort(nums);
    // var heap = new MaxHeap22(nums);
    // heap.heapSort();
    // var result = heap.heap.reverse();

    fs.writeFileSync("./aaa.js", JSON.stringify(result));
});

// console.log("aaaaa:", aaa);
var test1 = [-222, -33, 23, 4, 5, 63, 3, -3, 3, 42, 2, 34];

console.log("bbbbb:", sort([1, 5, 4, 9, 7, 6, 5]));
