const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  quantity: Number,
  price: Number
});

module.exports = mongoose.model('Inventory', inventorySchema);