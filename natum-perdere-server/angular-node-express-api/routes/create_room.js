var express = require('express');
var router = express.Router();

var uid = require('uid-safe')
var session = require('express-session')

var mysql = require('../db_connection').pool;

let creator_id = "dsds";
/* GET users listing. */
router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {  maxAge: 60000 }
  }));

router.get('/', function(req, res, next) {
  var strUid = uid.sync(18);
  mysql.query('SELECT * from banroom', (ex, rows) => {
      if (ex) {
        console.log(ex);
      } else {
        creator_id = rows[0].creator;
        console.log(creator_id);
      }
    });

  res.setHeader('Content-Type', 'application/json');

  res.end(JSON.stringify({guid: strUid, creator: req.session.id}));


  // database = req.db;

});

module.exports = router;
