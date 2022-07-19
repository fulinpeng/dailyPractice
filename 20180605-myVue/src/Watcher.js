function Watcher(vm, node, name, type) {
    Dep.target = this;
    this.name = name;
    this.node = node;
    this.vm = vm;
    this.type = type;
    this.update();
    Dep.target = null;
}

// watcher 就是用来 get/set vm里面的值，然后放到vnode中

Watcher.prototype = {
    update: function() {
        this.get();
        var batcher = new Batcher();
        batcher.push(this);
        // this.node[this.type] = this.value; // 观察者执行相应操作
    },
    cb: function() {
        this.node[this.type] = this.value; // 观察者执行相应操作
    },
    // 获取data的属性值
    get: function() {
        this.value = this.vm[this.name]; // watcher 才是枢纽啊，其它的 "节点" 都是通过 获取、操作 watcher的value ，来间接修改页面上的值的，那么问题来了，vue/vm（Vue实例的data）上的data的值怎么同步也变化呢，那是在表单的onchange事件来出发的，哈哈哈，还有那最初的data呢？那是参数对象的一个属性，js的按值传递嘛，所以也就被改了了，笨蛋
        // 触发相应属性的get ==> vm.text ，但是这个text是在 vm.data 上啊？？？
        // 你怎么获取，这个就是用了 defineProperty 数据劫持来做的了，哈哈
        // 立马触发get，就会立马添加这个个watcher到dep中
    }
}

// 看源码，new 一个实例时，只会执行function的构造器啊，原型对象上的方法一个都不会执行的，那些方法是在实例上去调用的。。。
// 方法之间的调用，把实例连接起来，构成了一个数据流程，像工单流程一样，像念珠一样，然后组成念珠网。。。
// 总是有很多代理、指针移动的东西，利用了js按引用传递