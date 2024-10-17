// 最长有效括号
// https://leetcode.cn/problems/longest-valid-parentheses/

// 一
function longestValidParentheses(s) {
    let left = 0,
        right = 0,
        maxlength = 0;
    for (let i = 0; i < s.length; i++) {
        if (s.charAt(i) == "(") {
            left++;
        } else {
            right++;
        }
        if (left == right) {
            maxlength = Math.max(maxlength, 2 * right);
        } else if (right > left) {
            left = right = 0;
        }
    }
    left = right = 0;
    for (let i = s.length - 1; i >= 0; i--) {
        if (s.charAt(i) == "(") {
            left++;
        } else {
            right++;
        }
        if (left == right) {
            maxlength = Math.max(maxlength, 2 * left);
        } else if (left > right) {
            left = right = 0;
        }
    }
    return maxlength;
}

// 二 简单却很难的感觉，难受，不好懂
function longestValidParentheses(s) {
    let maxans = 0;
    let stack = [];
    stack.push(-1); // 设置开端 -1
    for (let i = 0; i < s.length; i++) {
        if (s.charAt(i) == "(") {
            stack.push(i);
        } else {
            stack.pop();
            // stack.length 存在就有效
            // stack.length不存在说明上一个")"没有匹配到成对的括号，才会把-1（其实位置）都pop掉，就需要重新push(i)设置新的开端
            if (stack.length) {
                // 更新当前最长有效括号长度
                maxans = Math.max(maxans, i - stack[stack.length - 1]);
            } else {
                stack.push(i); // 关键 这里设置开端（最初的 -1）
            }
        }
    }
    return maxans;
}

// 滑动窗口解法（正解）⭐️
function longestValidParentheses(s) {
    let stack = [];
    let maxans = 0;
    let start = -1;
    let end = -1;
    for (let i = 0; i < s.length; i++) {
        end = i; // 每遍历一次就更新一次end
        if (s.charAt(i) == "(") {
            stack.push(i);
        } else {
            // 比如遇到：'()'、'()()'
            // 遇到：'()()'时，start并不会改变
            if (stack.length) {
                stack.pop();
                if (!stack.length) {
                    maxans = Math.max(end - start);
                }
            } else {
                // 比如遇到：')()'、'())'，更新start
                start = i;
            }
        }
    }
    return maxans;
}

// dp解法
// 对于最优的策略，一定有最后一个元素 s[i].

// 所以，我们先看第 i 个位置，这个位置的元素 s[i]可能有如下两种情况：

// s[i]== (
// 这时，s[i] 无法和其之前的元素组成有效的括号对，所以，dp[i]=0

// ⭐️下面的理解了才懂dp
// 我有个疑问为什么这样定义
//      难道 '()(' 结果为0 '())' 结果为2 ？？？不是的
//      他是说 '()(' 结果为[0,2,0] '())' 结果为[0,2,0]，结果是找到最大值都是2
// dp数组里面存的`不是`(晕了，为啥呀)当前最近的完整有效字符串的length，比如：'()()(()' => [0, 2, 0, 4, 0, 0, 2], '(())(' => [0, 0, 2, 4, 0]

// s[i]== )
// 这时，需要看其前面的元素来判断是否有有效括号对

// 情况1:
// s[i−1]== (
// 即 s[i] 和 s[i−1] 组成一对有效括号，有效括号长度新增长度2，i位置对最长有效括号长度为 其之前2个位置的最长括号长度加上当前位置新增的2，我们无需知道i−2位置对字符是否可以组成有效括号对。

// 那么有：
// dp[i]=dp[i−2]+2

// 情况2:
// s[i−1]== )
// 这种情况下，如果前面有和s[i]组成有效括号对的字符，即形如 ((....))，这样的话，就要求s[i−1]位置必然是有效的括号对，否则s[i]无法和前面对字符组成有效括号对。

// 这时，我们只需要找到和s[i]配对对位置，并判断其是否是 ( 即可。和其配对对位置为：i−1−dp[i−1]。

// 如果：s[i−dp[i−1]−1]== (
// 有效括号长度新增长度 2，i 位置对最长有效括号长度为 i-1位置的最长括号长度加上当前位置新增的 2，那么有：

// dp[i]=dp[i−1]+2

// 值得注意的是，i−dp[i−1]−1 和 i 组成了有效括号对，这将是一段独立的有效括号序列，如果之前的子序列是形如 (...) 这种序列，那么当前位置的最长有效括号长度还需要加上这一段。所以：

// dp[i]=dp[i−1]+dp[i−dp[i−1]−2]+2

// 注： 这个在分析时是很容易遗漏的，分析要更细致。我在第一次分析是就遗漏了，提交后，有用例 )()(()))不过，分析后发现是少了这一段。

// 子问题：
// 根据上面的分析，我们得到了如下两个计算公式：

// dp[i]=dp[i−2]+2

// dp[i]=dp[i−1]+dp[i−dp[i−1]−2]+2

// 那么，求dp[i]就变成了求dp[i−1]、 dp[i−2]、dp[i−dp[i−1]−2]的子问题。

// 这样状态也明确了：

// 设 dp 数组，其中第 i 个元素表示以下标为 i 的字符结尾的最长有效子字符串的长度。

var longestValidParentheses = function (s) {
    // ()(()    0 2 0 0 2
    // ()(())   0 2 0 0 2 4
    if (s.length == 0) return 0;
    const stack = [];
    const dp = new Array(s.length).fill(0);
    for (let i = 0; i < s.length; i++) {
        if (s[i] == "(") {
            stack.push("(");
        } else {
            if (stack[stack.length - 1] == "(") {
                stack.pop();
                if (i > 1) {
                    dp[i] = Math.max(dp[i - 1], dp[i - 2]) + 2;
                    if (i - dp[i] >= 0) dp[i] = dp[i] + dp[i - dp[i]];
                } else {
                    dp[i] = 2;
                }
            }
        }
    }
    return Math.max(...dp);
};
