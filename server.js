// server.js
// =========
// server file for Node.JS application. Sets up application and DB connection

// == set up ===================================================================
var express        = require('express');
var app            = express();                  // create our app w/ express
var morgan         = require('morgan');          // log requests to the console (express4)
var bodyParser     = require('body-parser');     // pull information from HTML POST (express4)
var port           = process.env.PORT || 80;

// == configuration ============================================================
var db = require('./app/db');
db.connect(function(err) {
    if (err) {
        console.log('Unable to connect to MySQL.');
    } else {
        console.log('Successfully connected to MySQL.');
    }
});

app.use(express.static(__dirname + '/public'));                 // set static files location, /public/server.js is now /server.js
app.use(express.static(__dirname + '/app'));                    // set additional static
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.json());                                     // parse application/json

// == routes ===================================================================
require('./app/routes')(app, db); // pass our application and DB connection into our routes

// == listen (start app with node server.js) ===================================
var d = new Date();
console.log("App started on: " + d.toLocaleString()); //just for confirming nodemon restarts after changes
app.listen(port);
console.log("App listening on port " + port);
