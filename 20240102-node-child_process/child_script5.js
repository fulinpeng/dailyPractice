process.on('message', (message) => {
    console.log(`子进程 2 收到消息: ${JSON.stringify(message)}`);
    process.send(JSON.stringify({ result: '子进程 2 完成任务' }));
});
