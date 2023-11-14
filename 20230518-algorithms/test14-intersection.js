// 版本一
var intersection = function (nums1, nums2) {
    if (!nums1 || !nums2 || !nums1.length || !nums2.length) return [];
    let res = [];
    for (const num of nums1) {
        if (res.indexOf(num) === -1 && nums2.indexOf(num) > -1) {
            res.push(num);
        }
    }
    return res;
};
// 版本二
var intersection = function (nums1, nums2) {
    if (!nums1 || !nums2 || !nums1.length || !nums2.length) return [];
    let temp = {};
    let temp2 = {};
    for (const num of nums1) {
        temp[num] = 1;
    }
    for (const num of nums2) {
        if (temp[num]) temp2[num] = 1;
    }
    return Object.keys(temp2);
};
// 版本三
// 排序，然后双指针，当前数值越小的指针优先往后移动，若相等两个指针都后移
var intersection = function (nums1, nums2) {
    nums1 = nums1.sort((a, b) => a - b);
    nums2 = nums2.sort((a, b) => a - b);
    let len1 = nums1.length;
    let len2 = nums2.length;
    let index1 = 0;
    let index2 = 0;
    let res = [];
    while (index1 < len1 && index2 < len2) {
        let lastRes = res[res.length - 1];
        let cur1 = nums1[index1];
        let cur2 = nums2[index2];
        if (cur1 === nums2[index2]) {
            if (cur1 !== lastRes) res.push(cur1);
            index1++;
            index2++;
        } else if (cur1 < cur2) {
            index1++;
        } else {
            index2++;
        }
    }
    return res;
};
