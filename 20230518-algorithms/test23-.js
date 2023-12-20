/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    const res = [];
    backtracking([]);
    return res;

    function backtracking(path = []) {
        if (path.length === nums.length) {
            res.push(path);
            return;
        }
        // 在这里debuger一下就能理解点了，必须这样，不然不懂
        for (let i = 0; i < nums.length; i++) {
            // ⭐️当递归被释放后，上一次执行的函数中i值，好好理解下，path只有一个值时i为1不是0
            if (path.indexOf(nums[i]) > -1) {
                // 没有这一步就...这有些难以解释
                continue;
            }
            // 在path中不存在，就push并递归
            backtracking(path.concat(nums[i])); // concat方法不会修改原值
        }
    }
};
console.log(permute([1, 2, 3]));

// 整个递归，我都没能理解透彻
