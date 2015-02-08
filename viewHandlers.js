var fs = require('fs');
var formidable = require('formidable');
var util = require('util');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var users = [
    { useremail: 'ishan1608@gmail.com', userpassword: '123456'},
    { useremail: 'ishan1608@live.com', userpassword: 'qwerty'}
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





// Hopefully a function to find whether an email is registered or not.
function findByUseremail(useremail, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.useremail === useremail) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID (I am using email) when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.useremail);
});

passport.deserializeUser(function(useremail, done) {
  findByUseremail(useremail, function (err, user) {
    done(err, user);
  });
});


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
  function(useremail, userpassword, done) {
      console.log('local strategy is getting ' + useremail + ' : ' + userpassword);
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // Find the user by username.  If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message.  Otherwise, return the
      // authenticated `user`.
      findByUsername(useremail, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + useremail }); }
        if (user.userpassword != userpassword) { return done(null, false, { message: 'Invalid password' }); }
        return done(null, user);
      })
    });
  }
));








// Local login using emailId and password combination
function loginLocal(req, res) {
    console.log('loginLocal called');
    // Not Working because passport authenticate only works as middleware, I think it only works with express
    passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/' });
}

function dashboard(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end('This is a dashboard');
}

exports.index = index;
exports.notFound = notFound;
exports.loginLocal = loginLocal;
exports.dashboard = dashboard;