require('colors');
var path = require('path');
var express = require('express'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    people = require(path.join(__dirname, 'data/people.json'));

var app = express();

// Configure Express - sessions and passport
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/mockup/', express.static(path.join(__dirname, 'mockup')));
app.use('/newmockup/', express.static(path.join(__dirname, 'newmockup')));
app.get('/api/people', function(req, res) {
    res.end(JSON.stringify(people, null, '    '));
});

/* Remember to have a redirect for both success and failure
app.post('/login', 
	passport.authenticate('local-login'),
	function(req, res) {
		res.redirect('/newmockup/loggedin.html');
	});

app.post('/register',
	passport.authenticate('local-register'),
	function(req, res) {
		res.redirect('/newmockup/registered.html');
	});
*/

var HTTP_PORT = 8080;

app.listen(HTTP_PORT, function(err) {
    if (err) {
        throw err;
    }

/* Configure db */
var dbConfig = require('./db.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);

console.log(('HTTP server listening on port ' + HTTP_PORT).green);

console.log('Mockup:'.bold + ' http://localhost:' + HTTP_PORT + '/mockup/');
console.log('New Mockup:'.bold + ' http://localhost:' + HTTP_PORT + '/newmockup/');
console.log('People data:'.bold + ' http://localhost:' + HTTP_PORT + '/api/people');
});