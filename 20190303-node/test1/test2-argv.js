// 获取参数列表：

let argv = process.argv;

// 参数:
console.log('argv[0]:', argv[0]);
console.log('argv[1]:', argv[1]);

let a = argv[2] - 0;
let b = parseInt(argv[3]);
let sum = a + b;

console.log('计算中...');

setTimeout(() => {
    console.log('计算结果为：' + sum);
}, 1000);




