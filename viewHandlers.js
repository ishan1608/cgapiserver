// Request handling for Views

// Index Handling
function index(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write("This is the server for Campus Globe API, and is in developement right now.");
    res.end();
}
// Not Found handler
function notFound(req, res) {
    res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
    res.write('We weren\' able to find ' + req.url + ' on our servers. Are you sure you typed the URL correct ? If yes please contact the admin of this server.');
    res.end();
}

exports.index = index;
exports.notFound = notFound;