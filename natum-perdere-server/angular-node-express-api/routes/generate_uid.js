var express = require('express');
var router = express.Router();

var uid = require('uid-safe')

var mysql = require('../db_connection').pool;

let creator_id = "dsds";
/* GET users listing. */
router.get('/', function(req, res, next) {
  var strUid = uid.sync(18);
  mysql.query('SELECT * from banroom', (ex, rows) => {
      if (ex) {
        console.log(ex);
      } else {
        console.log(creator_id);
        // console.log(null, rows[0].creator);
        creator_id = rows[0].creator;
        console.log(creator_id);
      }
    });

  // res.json({guid: strUid, creator: creator_id});
  // res.json({})
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({guid: strUid, creator: creator_id}));


  // database = req.db;

});

module.exports = router;
