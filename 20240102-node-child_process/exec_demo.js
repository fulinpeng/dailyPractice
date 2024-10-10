const { exec } = require("child_process");

// exec("node child_script3.js", (error, stdout, stderr) => {
//     if (error) {
//         console.error(`错误: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`标准错误输出: ${stderr}`);
//         return;
//     }
//     console.log(`标准输出: ${stdout}`);
// });

exec("ls -l", (error, stdout, stderr) => {
    if (error) {
        console.error(`执行错误: ${error}`);
        return;
    }
    console.log(`标准输出:\n${stdout}`);
});
