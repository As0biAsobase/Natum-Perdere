const app = require("express")();
var fs = require( 'fs' );

var cors = require('cors');

var ping_server = require('./routes/ping_server');
var get_card_code = require('./routes/get_card_code');
var get_leaderboard = require('./routes/get_leaderboard');
var check_ru = require('./routes/check_ru');

// const http = require("http").Server(app);
var https = require("https");
var server = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/perdere.ru/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/perdere.ru/cert.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/perdere.ru/chain.pem'),
     requestCert: false,     rejectUnauthorized: false },app);

const io = require("socket.io")(server);

const mongo = require('./db_connection');
app.locals.mongo = mongo;

const rooms = {}

async function start() {
  await mongo.init();
}

app.use(cors());

app.use('/api/v1/ping_server', ping_server);
app.use('/api/v1/get_card_code', get_card_code);
app.use('/api/v1/get_leaderboard', get_leaderboard);
app.use('/api/v1/check_ru', check_ru);

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
    mongo.db.collection("cardsCollection").find({}).sort({ cost: 1}).toArray(function(err, result) {
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
      socket.emit("card", result[0]);
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

async function getAssociatedCards(inputData) {
  result = await mongo.db.collection("cardsCollection").find( { cardCode : { $in: inputData["associated_cards"] } } ).toArray(function(err, result) {
    if (err) throw err;
    console.log(result.length);
    return result;
  });
  // console.log("HHHH" + result.length);
  return result;
}

server.listen(4444);
