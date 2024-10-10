// 对于分布式系统，推荐使用 RedLock 来确保锁的安全性

const Redis = require("ioredis");
const Redlock = require("redlock");

const redisClient = new Redis();
const redlock = new Redlock([redisClient]);

const lockKey = "file_lock";
const lockExpireTime = 5000; // 锁的过期时间（毫秒）

redlock
    .lock(lockKey, lockExpireTime)
    .then((lock) => {
        console.log("Lock acquired!");

        // 执行文件操作...

        return lock.unlock(); // 释放锁
    })
    .then(() => {
        console.log("Lock released!");
    })
    .catch((err) => {
        console.error("Failed to acquire lock:", err);
    });
