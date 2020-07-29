var mysql = require('mysql')
const assert = require("assert");

var pool = mysql.createPool({
  host: "localhost",
  user: "test",
  password: "password",
  database: "test",
  connectionLimit: 10,
  supportBigNumbers: true
});

exports.pool = pool;

// static connect() {
//   var con = mysql.createConnection({
//     host: "localhost",
//     user: "test",
//     password: "password",
//     database: "test"
// });
//
//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });
// }
//
// static test() {
//   con.query("SELECT * FROM banroom", function (err, result, fields) {
//   if (err) throw err;
//   console.log(result);
// });
// }
// }
