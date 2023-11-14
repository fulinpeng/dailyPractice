// 有效字符串如：(){}[]
// 无效字符串：(){[}]
var isValid = function (s) {
    let l = ["(", "{", "["];
    let r = [")", "}", "]"];
    let temp = [];
    if (!s || typeof s !== "string") return false;
    let i = 0;
    while (i < s.length) {
        let curSigne = s.charAt(i);
        if (l.indexOf(curSigne) > -1) {
            temp.push(curSigne);
            i++;
            continue;
        }
        if (r.indexOf(curSigne) > -1) {
            if (l[r.indexOf(curSigne)] !== temp[temp.length - 1]) {
                return false;
            }
            temp.pop();
        }
        i++;
    }
    if (!temp.length) return false;
    return true;
};
console.log(isValid("(){}[]"));
console.log(isValid("(){[}]"));
console.log(isValid("()"));
