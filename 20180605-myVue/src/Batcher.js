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

// 【重点】
// 因为，直接调用sub.cb的话就成了同步代码，遍历这个subs每次都要等对应按个DOM更新结束才能进入下一次遍历，这样很慢的
// 所以啊，这个在引入Batcher这一层，是为了收集管理所有要更新的watcher，让它们在js执行栈代码结束了再到宏队列执行更新DOM

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
// 一个Batcher产生，就会在this.queue中塞一个job(watcher)
// 当这个node节点的值更新后，就会调用reset方法，重置这个this.queue
Batcher.prototype.push = function(job) {
    if (!this.has[job.name]) { // 那么这里不就只能更新第一个watcher对应的v-mode/{{}} ？？？？？？这个怎么解释
        this.queue.push(job);
        this.has[job.name] = job;
        if (!this.waiting) {
            this.waiting = true;
            // 目的是：在"搜集"结束后，"一次性"更新页面所有的数据
            // 重点：前端eventLoop，defineProperty 会先执行，setTimeout 后执行，所以这里要用定时器来更新node中的数
            // 当data中某个字段改变，会触发setter，从而调用当前字段对应的dep.notify，这个notify会更新数组里面多有的DOM的值
            setTimeout(() => {
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