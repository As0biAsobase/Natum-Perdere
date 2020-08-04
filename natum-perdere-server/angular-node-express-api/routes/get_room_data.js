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
  var decks1 = [];
  var decks2 = []
  mysql.query('SELECT * from banroom', (ex, rows) => {
      if (ex) {
        console.log(ex);
      } else {
        creator_id = rows[0].creator;

        decks1.push(rows[0].deck_1_1);
        decks1.push(rows[0].deck_1_2);
        decks1.push(rows[0].deck_1_3);
        console.log(decks1);

        decks1.push(rows[0].deck_2_1);
        decks1.push(rows[0].deck_2_2);
        decks1.push(rows[0].deck_2_3);

        console.log(creator_id);
      }
    });

  res.setHeader('Content-Type', 'application/json');

  res.end(JSON.stringify({decks1: decks1, creator: req.session.id}));


  // database = req.db;

});

module.exports = router;
