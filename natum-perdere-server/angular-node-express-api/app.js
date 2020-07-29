var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

var users = require('./routes/users');

var generate_uid = require('./routes/generate_uid');
var mysql = require('./db_connection').pool;

// var test = function(req, res) {
//      mysql.getConnection(function(err, conn){
//          conn.query("select * from banroom", function(err, rows) {
//               console.log(rows)
//          })
//      })
// }
mysql.query('SELECT 2*2 "value"', (ex, rows) => {
    if (ex) {
      console.log(ex);
    } else {
      console.log(null, rows[0].value);
    }
  });

app.use('/api/v1/generate_uid', generate_uid);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/users', users);



app.use(function(req, res, next) {
  //req.db = require("./db_connection");
  //req.db.connect();

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type, Accept");
  next();
});

module.exports = app;
