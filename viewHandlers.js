var fs = require('fs');
var formidable = require('formidable');
var util = require('util');

// Hardcoded user Information
var users = [
    { useremail: 'ishan1608@gmail.com', userpassword: '123456', cookiejar=[]},
    { useremail: 'ishan1608@live.com', userpassword: 'qwerty', cookiejar=[]}
];

// Request handling for Views

// Index Handling
function index(req, res) {
    fs.readFile('views/index.html', {'encoding': 'utf-8'}, function (err, data) {
        if (err) {
            console.log('Error occurred while reading');
            res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
            res.write('There was an internal error on the server.\nPlease try again at a later time, or contact the system admins.');
        } else {
//            console.log('Sending the index page');
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write(data);
            res.end();
        }
    });
}

// Not Found handler
function notFound(req, res) {
    res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
    res.write('We weren\' able to find ' + req.url + ' on our servers. Are you sure you typed the URL correct ? If yes please contact the admin of this server.');
    res.end();
}


// Local login using emailId and password combination
function loginLocal(req, res) {
    console.log('loginLocal called');
//    res.writeHead(302, {'Location': '/dashboard', 'Content-Type': 'text/plain; charset=utf-8'});
//    res.write('Redirecting.......');
//    res.end();
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        // Need to set cookies on my own. For now I will test using hardocded users and hardocded cookie
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(util.inspect({fields: fields}));
    });
}

function dashboard(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end('This is a dashboard');
}

exports.index = index;
exports.notFound = notFound;
exports.loginLocal = loginLocal;
exports.dashboard = dashboard;