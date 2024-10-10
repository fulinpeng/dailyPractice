const { fork } = require("child_process");

const child1 = fork("child_script4.js");
const child2 = fork("child_script5.js");

child1.on("message", (message) => {
    console.log(`从子进程 1 收到消息: ${message}`);
});

child2.on("message", (message) => {
    console.log(`从子进程 2 收到消息: ${message}`);
});

// 发送消息给子进程
child1.send({ task: "开始子进程 1" });
child2.send({ task: "开始子进程 2" });
