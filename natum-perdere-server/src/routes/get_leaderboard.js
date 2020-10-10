var express = require('express');
var router = express.Router();
const got = require('got');

const options = {
  headers : {
    "X-Riot-Token": "RGAPI-18ca951d-e50e-4027-9932-51fb008283c7"
  }
}

router.get('/', function(req, res, next) {
  console.log(options);
  got('https://europe.api.riotgames.com/lor/ranked/v1/leaderboards', options).then(response => {
    console.log(response.body);
    console.log(response.body.explanation);

    res.setHeader('Content-Type', 'application/json');
    res.send(response.body);
  }).catch(error  => {
    console.log(error);
  });

});

module.exports = router;
