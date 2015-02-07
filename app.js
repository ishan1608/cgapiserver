var http = require('http');
var url = require('url');
var nodeStatic = require('node-static');

var staticServer = new(nodeStatic.Server)();

var port = Number(process.env.PORT || 8080);
var viewHandlers = require('./viewHandlers');

http.createServer(function (req, res) {
    var urlInfo  = url.parse(req.url, true, true);
//    console.log("urlInfo");
//    console.log(urlInfo.path);
    var firstLocation = urlInfo.path.split('/')[1];
//    console.log(firstLocation);
    
    // Serving CSS, JS and favicon
    if(firstLocation === 'css' || firstLocation === 'script' || firstLocation === 'favicon.ico') {
        console.log("CSS, JS or favicon.ico; needed static hosting");
        staticServer.serve(req, res);
    } else {
        switch(urlInfo.path) {
                // Index page
                case '/':
                case '/index':
                case '/index/':
                viewHandlers.index(req, res);
                default:
                viewHandlers.notFound(req, res);
        }
    }
}).listen(port);

console.log('Server running on port : ' + port);