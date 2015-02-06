var http = require('http');

var port = Number(process.env.PORT || 8080);

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('This is the API server for Campus Globe\n');
}).listen(port);
console.log('Server running on port : ' + port);