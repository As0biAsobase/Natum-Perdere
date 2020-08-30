var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: "password",
  database: "test",
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});

module.exports = con;
