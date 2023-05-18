
// 合并二维有序数组成一维有序数组，归并排序
var arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 2, 3], [4, 5, 6]];

// 思路一
var res = arr.flat(Infinity).sort((a, b) => { return a - b; })
console.log("🚀 ~ file: index.vue:74 ~ res:", res)

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


///////////////////////////////////////////////////////////

// 合并二维无序数组成一维有序数组呢？
var arr = [[3, 1, 3], [9, 5, 6], [10, 8, 6], [11, 22, 3]];
function mergeSort(arr) {
    let lengthArr = arr.length;
    if (lengthArr === 0) {
        return [];
    }
    while (arr.length >= 2) {
        let arrayItem1 = sort(arr.shift());
        let arrayItem2 = sort(arr.shift());
        let mergeArr = merge(arrayItem1, arrayItem2);
        arr.push(mergeArr);
    }
    return arr[0];
}
function sort(arr) {
    return arr.sort((a, b) => {
        return a - b;
    })
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


///////////////////////////////////////////////////////////
// 什么是 merge sort
var arr = [2, 3, 15, 1, 6, 9, 4, 5, 7];
function mergeSort(arr) {
    let _arr = [];
    if (arr.length < 2) return arr;
    let middle = Math.floor(arr.length / 2);
    return combine(mergeSort(arr.slice(0, middle)), mergeSort(arr.slice(middle)))
}
function combine(left, right) {
    let res = [];
    while (left.length && right.length) {
        // !!! 关键在这里，我总是想每次找到两个数（就是说比完大小，发现left更小那就先插入left再插入right导致排序失败）
        if (left[0] < right[0]) {
            res.push(left.shift())
        } else {
            res.push(right.shift())
        }
    }
    return res.concat(left).concat(right);
}
console.log("🚀 ~ mergeSort(arr)::", mergeSort(arr))

/**
 * 会不会得出这样的结论：
 * 1. 有序数组 和 一个元素组成的数组 是对等的
 * 2. merge/combine 函数的前提是：参数是有序列表或者单个元素
 * 
 * **/
