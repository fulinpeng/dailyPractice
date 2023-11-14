/*
用多种方法实现：
F(0) = 0;
F(1) = 1;
F(n) = F(n - 1) + F(n - 2);
*/
// 递归（基础版本）
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
// 加缓存
function fibonacci2(n) {
    let res = fibonacci2.res;
    if (!res[n]) res.push(fibonacci2(n - 1) + fibonacci2(n - 2));
    return res[n];
}
fibonacci2.res = [0, 1];

// 递归改为迭代
function fib3(n) {
    if (n < 0) throw new Error("输入的数字不能小于0");
    let f0 = 0,
        f1 = 1,
        curFib = f0;
    if (n < 2) {
        return n;
    }
    for (let i = 1; i < n; i++) {
        curFib = f0 + f1;
        f0 = f1;
        f1 = curFib;
    }
    return curFib;
}

// 尾递归
function fib4(n) {
    if (n < 0) throw new Error("输入的数字不能小于0");
    if (n < 2) return n;
    function _fib(n, a, b) {
        if (n === 0) return a;
        return _fib(n - 1, b, a + b); // 2 =》 _fib(1, 1, 1)
    }
    return _fib(n, 0, 1);
}
