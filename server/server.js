const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');


const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.use(parser.json());

MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('co2_input');
    const emissionsCollection = db.collection('emissions');
    const emissionsRouter = createRouter(emissionsCollection)
    app.use('/api/emissions', emissionsRouter);
  })
  .catch(console.err);

  const port = process.env.PORT || 3000
  app.listen(port, function () {
  console.log(`Listening on port ${ port }`);
  });
