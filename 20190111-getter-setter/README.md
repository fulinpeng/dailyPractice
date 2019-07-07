
* 对象属性重定义：ES5提供了Object.defineProperty与Object.defineProperties两个API，允许我们为对象的属性增设getter/setter函数。

`最容易想到的一个做法是遍历所有含有v-bind指令的DOM模板，利用相应的绑定数据在内存中拼装成一个fragment，然后再将新的fragment替换旧的DOM结构。但是这个方案存在两个问题：`

1. 修改未绑定至DOM的数据时，也会引发DOM的重新渲染。
2. 修改某个数据会导致所有DOM重新渲染，而非只更新数据变动了的相关DOM 。

`为了解决这个问题，我们需要引入Directive。`