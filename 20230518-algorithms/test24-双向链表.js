// 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
// https://leetcode.cn/problems/lru-cache/

// 容易忽视的点是：逐出 最久未使用的关键字

class Node {
    constructor(key = 0, value = 0) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.dummy = new Node(); // 哨兵节点
        this.dummy.prev = this.dummy;
        this.dummy.next = this.dummy;
        this.map = new Map();
    }

    getNode(key) {
        if (!this.map.has(key)) {
            return null;
        }
        const node = this.map.get(key);

        // 两句代码实现：逐出最久未使用的，remove是删除当前，pushNode是在最后添加 ⭐️
        this.remove(node);
        this.pushNode(node);

        return node;
    }

    get(key) {
        const node = this.getNode(key);
        return node ? node.value : -1;
    }

    put(key, value) {
        let node = this.getNode(key);
        if (node) {
            node.value = value; // 更新 value
            return;
        }
        node = new Node(key, value);
        this.map.set(key, node);
        this.pushNode(node); // 放在最上面
        if (this.map.size > this.capacity) {
            const oldNode = this.dummy.prev;
            this.map.delete(oldNode.key);
            this.remove(oldNode); // 去掉最旧的一个
        }
    }

    // 删除一个节点
    remove(x) {
        x.prev.next = x.next;
        x.next.prev = x.prev;
    }

    // 在链表尾添加一个节点
    pushNode(x) {
        x.prev = this.dummy;
        x.next = this.dummy.next;
        x.prev.next = x;
        x.next.prev = x;
    }
}

// 第二种 利用 Map 的骚操作
~function () {
    /**
     * @param {number} capacity
     */
    var LRUCache = function (capacity) {
        this.limit = capacity;
        this.cache = new Map();
    };

    /**
     * @param {number} key
     * @return {number}
     */
    LRUCache.prototype.get = function (key) {
        let tmp;

        if (this.cache.has(key)) {
            tmp = this.cache.get(key);

            // ⭐️
            this.cache.delete(key);
            this.cache.set(key, tmp);
            return tmp;
        }

        return -1;
    };

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    LRUCache.prototype.put = function (key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        this.cache.set(key, value);

        if (this.cache.size > this.limit) {
            this.cache.delete(this.cache.keys().next().value);
        }
    };
    // 测试：
    let lRUCache = new LRUCache(2);
    lRUCache.put(1, 1); // 缓存是 {1=1}
    lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
    lRUCache.get(1); // 返回 1
    lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
    let res = lRUCache.get(2); // 返回 -1 (未找到)
    console.log("🚀 ~ file: test24-双向链表.js:116 ~ res:", res);
};
