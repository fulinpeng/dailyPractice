// 如何用js数组的reduce方法实现promise的顺序执行

const promises = [
    () => new Promise((resolve) => setTimeout(() => resolve("one"), 1000)),
    () => new Promise((resolve) => setTimeout(() => resolve("two"), 1000)),
    () => new Promise((resolve) => setTimeout(() => resolve("three"), 1000)),
];

promises
    .reduce((prePromise, curPromiseFn) => {
        return prePromise.then((res) => {
            console.log("🚀 ~ file: returnprePromise.then ~ res:", res);
            return curPromiseFn();
        });
    }, Promise.resolve())
    .then((res) => {
        console.log("🚀 ~ file: returnprePromise.then ~ res:", res);
    })
    .catch((err) => {
        console.error(err); // 处理错误
    });
