var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log("Getting card code");

  mongo = req.app.locals.mongo;

  mongo.db.collection("cardsCollection").find( {name : req.query.name, collectible: true}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result[0]);
    console.log(result[0].cardCode);

    res.setHeader('Content-Type', 'application/json');
    res.send({code: result[0].cardCode});
  });
});

module.exports = router;
