function defineReactive(vm, key, val) {
    var dep = new Dep(); // 如果把这个dep放到watcher中生成，包括下面的addSub和notify，结果就是编译阶段正常，但是修改值时，会没有双向更新
    Object.defineProperty(vm, key, {
        get: function() {
            // 这个getter触发的次数在于页面上要绑定的个数，触发一次就要添加一个Dep.target(watcher)到Dep中
            // 添加watcher到主题对象Dep
            if (Dep.target) {
                // JS的浏览器单线程特性，保证这个全局变量在同一时间内，只会有同一个监听器使用
                dep.addSub(Dep.target);
            }
            console.log('into get Function');
            return val;
        },
        set: function(newVal) {
            if (newVal === val) return;
            val = newVal;
            // 为什么没有直接return这个 newVal 呢？因为如果你直接return了新的值，那么下一次访问的时候呢？当然也可以多写一句代码。。。你知道怎么办就不说了
            // 为什么把newValue赋值给val，他只是变量，不是vm上的，只是个局部变量，setter触发后会马上执行dep.notify，
            // 从而各个双向绑定的地方会获取值，从而触发getter，去获取val，此时val是闭包存下的新的值，被更新到页面上
            // vm[key] = newVal; // Maximum call stack size exceeded 为什么出这个错？vm[key] 会触发getter？？？？
            console.log(val);
            // 作为发布者发出通知 值有改变
            dep.notify();
        }
    })
}

function observe(obj, vm) {
    Object.keys(obj).forEach(function(key) {
        // 遍历给obj（vue实例）的data对象，每个属性都设置上getter和setter
        defineReactive(vm, key, obj[key]);
    })
}