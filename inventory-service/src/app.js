const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const inventoryRoutes = require('./routes/inventory');
const { receiveMessagesFromQueue } = require('./services/messaging');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://mongo:27017/inventory', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

receiveMessagesFromQueue();

app.listen(3001, () => {
  console.log('Inventory service listening on port 3001');
});