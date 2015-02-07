var http = require('http');
var url = require('url');
var nodeStatic = require('node-static');

var staticServer = new(nodeStatic.Server)();

var port = Number(process.env.PORT || 8080);

http.createServer(function (req, res) {
    var urlInfo  = url.parse(req.url, true, true);
//    console.log("urlInfo");
//    console.log(urlInfo.path);
    // Serving CSS and JS
    var firstLocation = urlInfo.path.split('/')[1];
//    console.log(firstLocation);
    
    if(firstLocation === 'css' || firstLocation === 'script' || firstLocation === 'favicon.ico') {
        console.log("CSS or JS, needed static hosting");
        staticServer.serve(req, res);
    } else {
        switch(urlInfo.path) {
                // Index page
                case '/':
                case '/index':
                case '/index/':
    //                console.log("Home page : " + urlInfo.path);
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write("This is the server for Campus Globe API, and is in developement right now.");
                res.end();
                default:
                    res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
                res.write('We weren\' able to find ' + urlInfo.path + ' on our servers. Are you sure you typed the URL correct ? If yes please contact the admin of this server.');
                res.end();
        }
    }
    
}).listen(port);

console.log('Server running on port : ' + port);