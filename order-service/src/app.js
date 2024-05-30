const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orders');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://mongo:27017/orders', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/orders', orderRoutes);

app.listen(3000, () => {
  console.log('Order service listening on port 3000');
});