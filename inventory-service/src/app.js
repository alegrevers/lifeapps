require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const inventoryRoutes = require('./routes/inventory');
const { receiveMessagesFromQueue } = require('./services/messaging');

const app = express();

app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/inventory', inventoryRoutes);

receiveMessagesFromQueue();

app.use((err, req, res, next) => {
  if (err instanceof Error) {
    console.error(err);
    res.status(err.statusCode).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).send('An error occurred!')
  }
});

app.listen(3001, () => {
  console.log('Inventory service listening on port 3001');
});