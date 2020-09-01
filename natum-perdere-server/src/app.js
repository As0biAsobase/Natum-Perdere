const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http)

const mongo = require('./db_connection');

const rooms = {}

async function start() {
  await mongo.init();
}

start();
// async function end() {
//   mongo.client.close();
//   console.log("Connection closed!");
// }

io.on("connection", socket => {

  let previousId;
  var connectionLimit = 2
  const safeJoin = room => {
    socket.leave(previousId);
    socket.join(room.id);
    previousId = room.id;
  };

  socket.on("getRoom", room => {
      safeJoin(room);
      console.log(socket.id);

      socket.emit("banroom", rooms[room.id]);
  });

  socket.on("addRoom", room => {
    room.creator = socket.id
    rooms[room.id] = room;
    safeJoin(room.id);
    console.log(room.creator);
    // io.emit("banrooms", Object.keys(rooms));
    socket.emit("banroom", room);
  });

  socket.on("getCard", inputData => {
    console.log(inputData["cardCode"]);
    mongo.db.collection("cardsCollection").find( {cardCode : inputData["cardCode"]}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result[0]);
      socket.emit("card", result[0])
    });
  });

  io.emit("banrooms", Object.keys(rooms))
});

http.listen(4444);
