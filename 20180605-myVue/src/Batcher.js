/**
 * 批处理构造函数
 * @constructor
 */
function Batcher() {
    this.reset();
}

/**
 * batcher是与app的data属性一一对应的，即：{{}}/v-mode 可能是绑定的同一个值，           错，与 {{}}/v-mode 才是一一对应的
 * 不是一个集合，是一对一的                                                           嗯，不是一个batcher装了所有的 {{}}/v-mode
 * 只有被绑定过的data属性，才会被添加到batcher里面，而且是一个watcher，一个batcher
 * Batcher 的存在显得多此一举，那有什么作用？是因为，需要每次完成了双向数据更新后，把数据清空，方便管理？？？，还是说与生命周期有关
 */


/**
 * 批处理重置
 */
Batcher.prototype.reset = function() {
    this.has = {};
    this.queue = [];
    this.waiting = false;
};

/**
 * 将事件添加到队列中
 * @param job {Watcher} watcher事件
 */
Batcher.prototype.push = function(job) {
    if (!this.has[job.name]) { // 那么这里不就只能更新第一个watcher对应的v-mode/{{}} ？？？？？？这个怎么解释
        this.queue.push(job);
        this.has[job.name] = job;
        if (!this.waiting) {
            this.waiting = true;
            // 重点：前端eventLoop，defineProperty 会先执行，setTimeout 后执行，所以这里要用定时器来更新node中的数
            setTimeout(() => { // 目的是：在编译结束后，一次性更新页面所有的数据
                this.flush();
            });
        }
    }
};

/**
 * 执行并清空事件队列
 */
Batcher.prototype.flush = function() {
    this.queue.forEach((job) => {
        job.cb();
    });
    this.reset();
};