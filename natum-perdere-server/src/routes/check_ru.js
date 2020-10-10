var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  mongo = req.app.locals.mongo;

  mongo.db.collection("playerRegions").find( {Name : req.query.name}).toArray(function(err, result) {
    if (err) throw err;
    var isRu;
    console.log(result);
    if (result.length > 0) {
      isRu = true;
    } else {
      isRu = false;
    }

    res.setHeader('Content-Type', 'application/json');
    res.send({isRu: isRu});
  });


  //as
});

module.exports = router;
