function Compile(node, vm) {
    if (node) {
        this.$frag = this.nodeToFragment(node, vm);
        return this.$frag;
    }
}
Compile.prototype = {
    nodeToFragment: function(node, vm) {
        var self = this;
        var frag = document.createDocumentFragment();
        var child;
        // 这里的node是 div#app 里面的所有东西，此时搬了个家，搬到了 frag 上
        while (child = node.firstChild) {
            self.compileElement(child, vm); // 把所有v-modle/{{}}的key，进行绑定
            frag.append(child); // 将所有子节点移动到 frag 中，用 appendChild 也是可以的
        }
        return frag;
    },
    compileElement: function(node, vm) {
        var reg = /\{\{(.*)\}\}/;

        //节点类型为元素
        if (node.nodeType === 1) {
            var attr = node.attributes;
            // 解析属性
            for (var i = 0; i < attr.length; i++) {
                if (attr[i].nodeName == 'v-model') { // 有v-model的肯定是个表单元素
                    var name = attr[i].nodeValue; // 获取v-model绑定的字段名
                    node.addEventListener('input', function(e) {
                        // 给相应的data字段赋值，进而触发该字段的set方法
                        vm[name] = e.target.value;
                    });
                    // node.value = vm[name]; // 将data的值赋给该node
                    new Watcher(vm, node, name, 'value');
                }
            };
        }
        //节点类型为text
        if (node.nodeType === 3) {
            if (reg.test(node.nodeValue)) {
                var name = RegExp.$1; // 获取匹配到的字符串
                name = name.trim();
                // node.nodeValue = vm[name]; // 将data的值赋给该node
                new Watcher(vm, node, name, 'nodeValue');
            }
        }
    },
}

// 要处理好一件事：多个 {{}}/v-modle 对应一个data字段，怎么更新DOM节点值和data字段？？？
// 其实，更新了vm里的值，data中的字段的值，肯定也就变了
// 用watcher来做中转，提供set/get，
// 接着，一，用 dep 装了更新所有的 {{}}/v-modle 的方法（也就是watcher），这里是发布订阅者模式的骨架了，
//          在哪里创建？dep 是在 defineReactive 方法中创建的，每个data字段对应一个 dep
//          在哪里订阅？在编译阶段触发 observe 的 getter 时，通过 dep.addSub 来订阅
//          多个 {{}}/v-modle 怎么办？每个 dep 对应一个data字段，而 dep.subs 就是这样收集了每个data字段对应的所有DOM节点
//          dep 会在每次有值发生变化是执行(data改变、页面改变，都会notify通知并执行更新，更新的方法在watcher上)
// 然后，二，用 batcher 来装一个一个的 {{}}/v-modle ，它的作用就是调用 watcher 里的 cb() ， batcher 只在编译阶段执行