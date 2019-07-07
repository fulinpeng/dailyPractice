* indexedDB.open 打开一个 indexDB 对象，他身上有：onerror onsuccess onupgradeneeded 方法
    * 这些方法中可以拿到 db 对象
        * db对象上有：createObjectStore transaction 等
            * transaction来打开一个事务
                * 一个store有：get、put、delete、clear、index、openCursor
                * index、openCursor、index.openCursor 索引/游标，来高级查找
                    * cursor.continue()返回 undefined 的时候遍历结束

* 上述方法，用success回调来处理结果
