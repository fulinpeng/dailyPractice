
/**
 * 字符串出现的不重复最长长度
 */
var str = 'AttendanceTableRow'.split('').reverse().join('');
function getMaxNoRepeat(str) {
    let maxLen = 0;
    let maxStr = '';
    let temp = [];
    let len = str.length;
    for (let start = 0; start < len - 1; start++) {
        for (let cur = start + 1; cur < len; cur++) {
            let curStr = str[cur];
            if (temp.indexOf(curStr) > -1) {
                if (cur - start > maxLen) {
                    maxLen = cur - start;
                    maxStr = temp.join('');
                    console.log("🚀 ~ file: index.vue:83 ~ getMaxNoRepeat ~ maxStr:", maxStr)
                }
                temp = [str[start + 1]];
                maxStr = '';
                break;
            } else {
                temp.push(curStr);
            }
            if (cur === len - 1) {
                // 下面的1是关键，就是因为这里没处理最后一个字符导致，搞一上午
                if (cur - start + 1 > maxLen) {
                    maxLen = cur - start + 1;
                    maxStr = temp.join('');
                    console.log("🚀 ~ file: index.vue:97 ~ getMaxNoRepeat ~ maxStr:", cur, start, temp.join(''))
                }
            }
        }
    }
    return {
        maxLen,
        maxStr,
    }
}
getMaxNoRepeat(str)

/**
 * 1. maxLen和maxStr从根本上来说是从不同来源得出的结论，如果只保留一个能更好
 * 2. 注意处理边界情况，处理好了就能通过更多用例
 * 下面是改进版本：
*/
var str = 'AttendanceTableRow'//.split('').reverse().join('');
// 双重循环
function getMaxNoRepeat(str) {
    let maxLen = 0;
    let maxStr = '';
    let len = str.length;
    for (let start = 0; start < len; start++) {
        for (let cur = start + 1; cur < len; cur++) {
            let temp = str.slice(start, cur);
            let curStr = str[cur];
            console.log("🚀 ~ file: index.vue:118 ~ getMaxNoRepeat ~ temp:", temp, curStr)
            if (temp.indexOf(curStr) > -1) {
                if (cur - start > maxLen) {
                    maxLen = cur - start;
                    maxStr = temp;
                    console.log("🚀 ~ file: index.vue:83 ~ getMaxNoRepeat ~ maxStr:", maxStr)
                }
                break;
            }
            if (cur === len - 1) {
                console.log("🚀 ~ file: index.vue:97 ~ getMaxNoRepeat ~ maxStr:", cur, start, temp)
                if (cur - start + 1 > maxLen) {
                    maxLen = cur - start + 1;
                    maxStr = temp + str[len - 1];
                }
            }
        }
    }
    return {
        maxLen,
        maxStr,
    }
}
getMaxNoRepeat(str)


// 正解，精简版：双指针 i j 作为区间边界
var lengthOfLongestSubstring = function (s) {
    let map = new Map();
    let i = -1 // 不好解时，i从-1开始，可能是捷径
    let res = 0
    let n = s.length
    for (let j = 0; j < n; j++) {
        if (map.has(s[j])) {
            i = map.get(s[j]) // 作为下一次的起点（相当于 第一次的-1位置）
        }
        res = Math.max(res, j - i)
        map.set(s[j], j)
    }
    return res
};
lengthOfLongestSubstring('AttendanceTableRow'.split('').reverse().join(''))
