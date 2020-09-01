const { MongoClient } = require('mongodb');


class Connection {
  constructor() {
    const url = `mongodb://localhost:27017`;

    this.client = new MongoClient(url,  { useNewUrlParser: true, useUnifiedTopology: true });
  }
  async init() {
    await this.client.connect();
    console.log('connected');

    this.db = this.client.db("natum-perdere");
  }
}

module.exports = new Connection();
