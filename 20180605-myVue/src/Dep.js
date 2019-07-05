function Dep() { // 数据执行保护的缩写 Data Execution Prevention
    this.subs = [];
    // subs 才是装的所有的{{}}/v-modle
}

// 发布订阅者模式

// sub是watcher，是v-modle和{{}}
// 每一个watcher对应一个dep
// 即使是同一个字段，被多个v-modle/{{}}绑定，也是由后者的个数决定的
// dep的个数与data的字段直接相关，
// subs/watcher的个数，与v-modle/{{}}的个数直接相关
// 每个data的字段对应一个dep，而每个dep包含很多个watcher/sub(一个字段可能被绑定在多个节点上)

// 所以，应该解决的问题是：
//      1. 当遍历data的时候，给所有字段new一个对应的Dep
//      2. 当第一次new Watcher的时候，把这个watcher添加到这个dep.subs中(get方法是在此时第一次执行的)
//      3. 然后再次遇到相同的字段就添加到对应的dep.subs中
//      4. 闭包天生就能管理到底是哪个dep
//      5. 哈哈，在defineReactive方法中，那就是个闭包啊，都不需要判断到底是哪个dep...能理解吗?

Dep.prototype = {
    addSub: function(sub) {
        // 第一次触发getter时，添加一个sub(在compile中会去获取值从而触发getter)
        this.subs.push(sub);
    },
    notify: function() {
        // 有触发setter时，就update所有的绑定数据，update上面有 new Batcher() ，每次有值变化都要newdata的属性那么多个Batcher去更新页面上的数据，也就是node上的数据
        this.subs.forEach(function(sub) {
            sub.update();
            // sub.cb();
            // 其实要是不用sub.update的话，就不需要Batcher了，这里Batcher是一个中间层(不知道它的实际作用)
            // 调用sub.cb就可以直接更新数据了
        })
    }
}