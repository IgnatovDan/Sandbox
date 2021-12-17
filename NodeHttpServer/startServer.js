const http = require('http');
http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello world!');
}).listen(12345, '127.0.0.1');

console.log('Server is started at http://127.0.0.1:12345');