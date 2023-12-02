let array = [4, 2, 5, 1, 6, 3];
// 递归
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    let left = [];
    let right = [];
    let mid = Math.floor(arr.length / 2);
    for (let i = 0; i < arr.length; i++) {
        if (i < mid) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right) {
    let res = [];
    while (left.length && right.length) {
        let leftVal = left.shift();
        let rightVal = right.shift();
        if (leftVal > rightVal) {
            res.push(rightVal, leftVal);
        } else {
            res.push(leftVal, rightVal);
        }
    }
    if (left.length) res.push(left.shift());
    if (right.length) res.push(right.shift());
    return res;
}
console.log("Sorted array is:", mergeSort(array));

// 非递归
function mergeSort2(arr) {
    let queue = [arr];
    let mid = 0;
    while (mid > 0) {
        let tempArr = queue.shift();
        mid = Math.floor(tempArr.length / 2);
        left = [];
        right = [];
        for (let i = 0; i < tempArr.length; i++) {
            if (i < mid) {
                left.push(tempArr[i]);
            } else {
                right.push(tempArr[i]);
            }
        }
        queue.push(left, right);
    }
    console.log("🚀 ~ file: test22-mergeSort.js:52 ~ mergeSort2 ~ queue:", queue);
    while (queue.length != 1) {
        let left = queue.pop();
        let right = queue.pop();
        queue.push(merge(left, right));
    }
    console.log("🚀 ~ file: test22-mergeSort.js:58 ~ mergeSort2 ~ queue:", queue);

    // let cur = merge(queue.pop(), queue.pop);
}
console.log("Sorted array is:", mergeSort2(array));
