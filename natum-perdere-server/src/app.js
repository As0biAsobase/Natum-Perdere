const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http)

const mongo = require('./db_connection');

const rooms = {}

async function start() {
  await mongo.init();
}

start();

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

  socket.on("getAllCards", function() {
    mongo.db.collection("cardsCollection").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result.length);
        console.log(result[0]);
        socket.emit("allCards", result);
    });
  });

  socket.on("getCard", inputData => {
    console.log(inputData["cardCode"]);
    mongo.db.collection("cardsCollection").find( {cardCode : inputData["cardCode"]}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result[0]);
      socket.emit("card", result[0])
    });
  });

  socket.on("getAssociatedCards", async function(inputData) {
    var associatedCardsPromise = (inputData) => (
        new Promise((resolve, reject) => {
          mongo.db.collection("cardsCollection").find( { cardCode : { $in: inputData["associated_cards"] } } ).toArray(function(err, result) {
            if (err) throw err;
            console.log("Got db data " + result.length);
            resolve(result);
          });
        })
    );

    var callAssociatedCardsPromise = async (inputData) => {
        var result = await (associatedCardsPromise(inputData));
        return result;
        console.log("Called promise" + result);
    };

    callAssociatedCardsPromise(inputData).then(function(result) {
      console.log("Returned data " + result);
      socket.emit("associated_cards", result);
    });
  });

  io.emit("banrooms", Object.keys(rooms))
});

http.listen(4444);



async function getAssociatedCards(inputData) {
  result = await mongo.db.collection("cardsCollection").find( { cardCode : { $in: inputData["associated_cards"] } } ).toArray(function(err, result) {
    if (err) throw err;
    console.log(result.length);
    return result;
  });
  // console.log("HHHH" + result.length);
  return result;
}
