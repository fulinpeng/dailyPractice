// 获取参数列表：

let path = require('path');

// 路径拼接
const myPath = path.join(__dirname, '//a//', '//b//', '//c//');
console.log('myPath:', myPath);

// 根据相对路径生成绝对路径
const str = './dfg/hig.js';
const absStr = path.resolve(str);
console.log('相对转绝对:', absStr);

// 解析为路径对象
// 该对象是可以修改的
const pathObj = path.parse(myPath);
console.log('路径对象:', pathObj);