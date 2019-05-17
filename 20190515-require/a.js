console.log('module.id: ', module.id);
console.log('module.exports: ', module.exports);
console.log('module.parent: ', module.parent);
console.log('module.filename: ', module.filename); // 当前文件(模块)的绝对路径
console.log('module.loaded: ', module.loaded); // 输出这些内容时，模块还没有全部加载，所以 loaded 属性为 false
console.log('module.children: ', module.children);
console.log('module.paths: ', module.paths); // 包含了该模块可能的位置(加载的时候回用到这个来镜像查询)
