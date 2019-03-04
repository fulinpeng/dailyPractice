// 获取参数列表：

const fs = require('fs');

// 读取文件
fs.readFile('../file/a.txt', (err, data) => {
    if (err) throw err;

    // data 是个buffer: <Buffer 61 62 63>
    console.log('data:', data);

    // 用 toString 方法可以转义
    // 该方法要加上编码格式，默认为 utf8
    const dataStr = data.toString('utf8');
    console.log('dataStr:', dataStr);

    // I/O操作
    // writeFile(path, data, callback)
    // 该方法是改写，不是追加
    fs.writeFile('../file/a.txt', 'abcd', (err) => {
        if (err) throw err;
        console.log('写入完毕！');
    });

    // 追加
    // appendFile(path, data, callback)
    fs.appendFile('../file/a.txt', '哈哈', (err) => {
        if (err) throw err;
        console.log('追加完毕！');
    });
})

const fn = () => {
    // 同步读取方法，上面那些是异步读取
    // readFileSync(path, 'utf8')
    // writeFileSync(path, 'utf8')

    // 读
    let data = fs.readFileSync('../file/a.txt', 'utf8');

    // 写，把a文件复制为b文件
    fs.writeFileSync('../file/b.txt', data);
    console.log('文件复制成功')
}

// 不能写成同步的，会报一个你看不出问题的错误
setTimeout(fn, 2000)