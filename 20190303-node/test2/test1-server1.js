const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<head><meta charset="utf-8"/></head>');
    res.end('端口：8888');
}).listen(8888, () => {
    console.log('服务器已启动：port:8888');
});