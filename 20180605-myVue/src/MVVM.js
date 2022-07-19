function Vue(options) {
    this.data = options.data;
    var data = this.data;
    observe(data, this);
    var id = options.el;
    var dom = new Compile(document.getElementById(id), this);
    // 编译完成后，将dom返回到app中
    document.getElementById(id).appendChild(dom);
    // 这是为什么呢？为什么没有追加到后面，而是重写了node节点
    // 嗯嗯，要理解就要看dom是什么，它是 app节点被搬到一个空白节点的结果，这个空白节点很重要，真正的vue是用的virtualDom
    // 相当于app里面的东西跑了一圈回到了原点
    // 做了什么？跑到compile中编译了一遍，并添加了订阅、绑定等操作
}