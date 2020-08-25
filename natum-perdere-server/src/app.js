const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http)

var mysql = require('mysql');

const rooms = {}

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

  io.emit("banrooms", Object.keys(rooms))
});

http.listen(4444);

// const documents = {}
//
// io.on("connection", socket => {
//   let previousId;
//   const safeJoin = currentId => {
//     socket.leave(previousId);
//     socket.join(currentId);
//     previousId = currentId;
//   };
//
//   socket.on("getDoc", docId => {
//     safeJoin(docId);
//     socket.emit("document", documents[docId])
//   });
//
//   socket.on("addDoc", doc => {
//     documents[doc.id] = doc;
//     safeJoin(doc.id);
//     io.emit("documents", Object.keys(documents));
//     socket.emit("document", doc);
//   });
//
//   socket.on("editDoc", doc => {
//     documents[doc.id] = doc;
//     socket.to(doc.id).emit("document", doc);
//   });
//
//   io.emit("documents", Object.keys(documents));
// });
