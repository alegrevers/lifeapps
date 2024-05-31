const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orders');
const database = require('./utils/database');

const app = express();

app.use(bodyParser.json());

database

app.use('/api/orders', orderRoutes);

app.use((err, req, res, next) => {
  if (err instanceof Error) {
    console.error(err);
    res.status(err.statusCode).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).send('An error occurred!')
  }
});

app.listen(3000, () => {
  console.log('Order service listening on port 3000');
});

module.exports = app