const MongoClient = require('mongodb').MongoClient  

class Connection {
    constructor() {
      this.client = new MongoClient('mongodb://localhost:27017');
      this.db = null;
      this.options = {
          bufferMaxEntries:   0,
          useNewUrlParser:    true,
          useUnifiedTopology: true,
      }
    }

    static connectToMongo(connection) {
      connection.client.connect(function(err) {
        // assert.equal(null, err);
        console.log("Connected!")

        conection.db = connection.client.db("natum-perdere");

        connection.client.close();
      });
        // if ( this.db ) return Promise.resolve(this.db)
        // return MongoClient.connect(this.url, this.options)
        //     .then(client => this.client = client)
    }
}

// Connection.client = new MongoClient('mongodb://localhost:27017');
// Connection.db = null;
// // Connection.url = 'mongodb://localhost:27017'
// Connection.options = {
//     bufferMaxEntries:   0,
//     useNewUrlParser:    true,
//     useUnifiedTopology: true,
// }

module.exports = { Connection }
