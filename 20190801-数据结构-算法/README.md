# 动态规划
* 从 [index.5](./index.5.动态规划.html) [index.6](./index.6.动态规划.html) 例子可以看出：
    * 动态规划的核心思想是
        1. 找规律，复杂问题单元化
        2. 初始化数据
        3. 推出迭代公式
        4. 用代码实现迭代公式
    * 有哪些优化项：
        * 把已经处理过得情况都缓存起来，以空间换取时间的算法
        * 可以用闭包、栈等方式存起来，不用重复计算即可
    * 但是 [index.6](./index.6.动态规划.html) 这个策略是失败的...这不是动态规划...

function fn() {
    var cache = [[]];
// 第n个字母作为开头后面的组合好生成一个数组并返回这个数组，剩下的都依次这样做，先把这个弄出来再说
// 或者缓存的是str的一部分，也行
    return function fnn1(str) {
        var res,
			n = str.length,
			arr = str.split('');
		if (n == 1) {
			if (cache[1]) {
				res = cache[1];
			} else {
				res = cache[1] = str;
			};
		} else {
//             if (cache[n]) return cache[n];
//             if (cache[n - 1]) {
//                 res = n * cache[n - 1];
//             } else {
//                 res = n * fnn(n - 1);
//             }
		}
        return res;
    }
}
var fnn = fn();
fnn(5);