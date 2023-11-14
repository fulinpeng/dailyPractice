// https://leetcode.cn/problems/minimum-window-substring/
/**
 * 输入：s = "ADOBECODEBANC", t = "ABC"
 * 输出："BANC"
 */
var minWindow = function (s, t) {
    if (!t || !s || s.length < t.length) return "";
    if (s.indexOf(t) > -1) return t;
    let map = {};
    let minWin = "";
    for (const k of t) {
        map[k] = map[k] ? map[k] + 1 : 1;
    }
    let types = Object.keys(map).length;
    let left = 0,
        right = 0;
    let sLen = s.length;
    while (right < sLen) {
        let rightVal = s[right];
        if (map[rightVal] !== undefined) {
            map[rightVal]--; // 满足一次需求，就减少一次(可能为负数)
            if (map[rightVal] === 0) types--; // 某个字符全找到了，该类型减一
        }
        right++;
        // 找到所有类型，记录当前串，并滑动左指针
        while (types === 0) {
            let curStr = s.slice(left, right);
            let leftVal = s[left];
            if (minWin === "" || curStr.length < minWin.length) {
                minWin = curStr;
            }
            if (map[leftVal] !== undefined) {
                map[leftVal]++; // 每left找到一个t中的字符，就增加一
                if (map[leftVal] === 1) types++;
            }
            left++;
        }
    }
    return minWin;
};
