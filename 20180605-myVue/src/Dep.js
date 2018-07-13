function Dep() { // 数据执行保护的缩写 Data Execution Prevention
    this.subs = [];
    // subs 才是装的所有的{{}}/v-modle
}

// 发布订阅者模式

// sub是watcher，是v-module和{{}}
// 每一个watcher对应一个dev
Dep.prototype = {
    addSub: function(sub) {
        // 有触发getter时，添加一个sub，在compile中会去获取值从而触发getter
        this.subs.push(sub);
    },
    notify: function() {
        // 有触发setter时，就update所有的绑定数据，update上面有 new Batcher() ，每次有值变化都要newdata的属性那么多个Batcher去更新页面上的数据，也就是node上的数据
        this.subs.forEach(function(sub) {
            sub.update();
        })
    }
}