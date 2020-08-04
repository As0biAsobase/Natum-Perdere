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
  console.log([ req.session.id, req.session.id, Math.random().toString(36).substr(2, 5)]);

 room_id = Math.random().toString(36).substr(2, 4);

  mysql.query('INSERT INTO test.banrooms (creator, user1, room_id) VALUES (?, ?, ?);', [ req.session.id, req.session.id, room_id], (ex, rows) => {
      if (ex) {
        console.log(ex);
      } else {
        // creator_id = rows[0].creator;
        // console.log(creator_id);
      }
    });

  res.setHeader('Content-Type', 'application/json');

  res.end(JSON.stringify({guid: strUid, room_id: room_id}));


  // database = req.db;

});

module.exports = router;
