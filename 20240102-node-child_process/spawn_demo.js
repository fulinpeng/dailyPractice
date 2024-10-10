const { spawn } = require("child_process");

const child1 = spawn("node", ["child_script1.js"]);
const child2 = spawn("node", ["child_script2.js"]);

child1.stdout.on("data", (data) => {
    console.log(`子进程 1 输出: ${data}`);
});

child2.stdout.on("data", (data) => {
    console.log(`子进程 2 输出: ${data}`);
});
