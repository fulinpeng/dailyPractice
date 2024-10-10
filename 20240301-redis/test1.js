const redis = require('redis');
const client = redis.createClient();

const lockKey = 'file_lock'; // 锁的键
const lockValue = Date.now(); // 锁的值，可以是一个唯一标识
const lockExpireTime = 5000; // 锁的过期时间（毫秒）

function acquireLock(callback) {
    client.set(lockKey, lockValue, 'NX', 'PX', lockExpireTime, (err, res) => {
        if (err) {
            console.error('Error acquiring lock:', err);
            return callback(err);
        }
        if (res) {
            // 锁成功
            callback(null, true);
        } else {
            // 锁未成功
            callback(null, false);
        }
    });
}

function releaseLock(callback) {
    client.del(lockKey, (err, res) => {
        if (err) {
            console.error('Error releasing lock:', err);
            return callback(err);
        }
        callback(null, res);
    });
}

// 使用示例
acquireLock((err, success) => {
    if (success) {
        console.log('Lock acquired!');

        // 执行文件操作...

        // 释放锁
        releaseLock((err, res) => {
            console.log('Lock released!');
        });
    } else {
        console.log('Failed to acquire lock.');
    }
});
