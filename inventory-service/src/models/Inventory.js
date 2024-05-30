const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  product_id: String,
  quantity: Number
});

module.exports = mongoose.model('Inventory', inventorySchema);