var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var bodyParser = require('body-parser');
var uid = require('uid-safe')

var app = express();

var users = require('./routes/users');

var generate_uid = require('./routes/generate_uid');
var create_room = require('./routes/create_room');
var mysql = require('./db_connection').pool;

mysql.query('SELECT 2*2 "value"', (ex, rows) => {
    if (ex) {
      console.log(ex);
    } else {
      console.log(null, rows[0].value);
    }
  });

app.use('/api/v1/generate_uid', generate_uid);
app.use('/api/v1/create_room', create_room);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/users', users);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {  maxAge: 60000 }
}))

app.use(function(req, res, next) {
  //req.db = require("./db_connection");
  //req.db.connect();

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type, Accept");
  req.session.id = uid.sync(18);
  next();
});



module.exports = app;
