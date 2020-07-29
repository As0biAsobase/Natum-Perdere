const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  router.post('/event', (req, res, next) => {
  db.query(
    'INSERT INTO banroom (creator, user1, room_id) VALUES (?,?,?)',
    [req.body.creator, req.body.creator, req.body.room_id],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

  return router;
}

module.exports = createRouter;
