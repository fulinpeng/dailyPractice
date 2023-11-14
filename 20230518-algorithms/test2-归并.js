// 合并二维有序数组成一维有序数组，归并排序

// 有序数组 和 一个元素组成的数组 是对等的
var arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 2, 3],
    [4, 5, 6],
];

// 思路一
var res = arr.flat(Infinity).sort((a, b) => {
    return a - b;
});
console.log("🚀 ~ file: index.vue:74 ~ res:", res);

// 思路二
function mergeSort(arr) {
    let lengthArr = arr.length;
    if (lengthArr === 0) {
        return [];
    }
    while (arr.length > 1) {
        let arrayItem1 = arr.shift();
        let arrayItem2 = arr.shift();
        let mergeArr = merge(arrayItem1, arrayItem2);
        arr.push(mergeArr);
    }
    return arr[0];
}
function merge(arr1, arr2) {
    var result = [];
    while (arr1.length && arr2.length) {
        if (arr1[0] < arr2[0]) {
            result.push(arr1.shift());
        } else {
            result.push(arr2.shift());
        }
    }
    return result.concat(arr1).concat(arr2);
}
mergeSort(arr);

//////////////////////////

// 归用递归实现
// var arr=[1,2,4,2,3,7,3,5,7,4,5,8]
function divide(arr) {
    if (arr.length <= 1) return arr;
    let mid = Math.floor(arr.length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);
    arr = concat(divide(left), divide(right));
    console.log("🚀 ~ file: ImportExcel.vue:263 ~ divide ~ arr:", arr);
    return arr;
}

function concat(left, right) {
    if (!right) return left;
    let res = [];
    while (left.length && right.length) {
        // 关键在这里，需要比较，每次把最小的加进来
        let l = left[0];
        let r = right[0];
        if (l <= r) {
            res.push(l);
            left.shift();
        } else {
            res.push(r);
            right.shift();
        }

        // 以前是这样写的，导致了下面的结果
        // let l = left.shift()
        // let r = right.shift()
        // if (l < r) {
        //   res.push(l, r)
        // } else {
        //   res.push(r, l)
        // }
        // 结果：
        // [1, 2, 2, 3, 4, 7]
        // [3, 4, 5, 5, 7, 8]
        // ==>
        // [1, 3, 2, 4, 2, 5, 3, 5, 4, 7, 7, 8]
    }
    if (left.length) res = res.concat(left);
    if (right.length) res = res.concat(right);
    console.log("concat.res:", res);
    return res;
}
var res = divide([1, 2, 4, 2, 3, 7, 3, 5, 7, 4, 5, 8]);

// 递归，连续调用自身就是递，形成调用栈嵌套，直到触发边界条件为止，递结束
// 然后就是从最内层函数执行并释放，释放的过程为归，直到函数嵌套执行完为止，归结束
