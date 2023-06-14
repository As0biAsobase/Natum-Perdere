var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log("here");
  // console.log(req.query.id);

  res.setHeader('Content-Type', 'application/json');
  res.send({meow: 'meow'});
});

module.exports = router;
