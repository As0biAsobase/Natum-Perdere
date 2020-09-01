const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http)

const { Connection } = require('./db_connection');


const rooms = {}

io.on("connection", socket => {
  Connection.connectToMongo();
  // client.open(client => {
  //   var db = client.db("natum-perdere");
  //   client.close();
  // });
  // let db = Connection.client.db("natum-perdere")

  let previousId;
  var connectionLimit = 2
  const safeJoin = room => {
    socket.leave(previousId);
    socket.join(room.id);
    previousId = room.id;
  };

  socket.on("getRoom", room => {
      safeJoin(room);
      Connection.db.collection("cardsCollection").find( {"name" : "Люкс"}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        Connection.client.close();
      });
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

  io.emit("banrooms", Object.keys(rooms))
});


http.listen(4444);
