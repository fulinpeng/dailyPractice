/**
 * 字符串出现的不重复最长长度
 * 双指针
 */
var str = "AttendanceTableRow".split("").reverse().join("");
function getMaxNoRepeat(str) {
    let maxStr = "";
    let temp = "";
    let len = str.length;
    for (let start = 0; start < len - 1; start++) {
        for (let cur = start; cur < len; cur++) {
            let curStr = str[cur];
            if (temp.indexOf(curStr) > -1) {
                if (temp.length > maxStr.length) {
                    maxStr = temp;
                }
                temp = "";
                break;
            } else {
                temp += curStr;
            }
            if (cur === len - 1) {
                // 处理到最后一个字符就判断是否得到了最长串
                if (temp.length > maxStr.length) {
                    maxStr = temp;
                }
            }
        }
    }
    return {
        maxStr,
        maxLen: maxStr.length,
    };
}
getMaxNoRepeat(str);
