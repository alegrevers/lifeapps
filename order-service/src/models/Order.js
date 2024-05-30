const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer_id: String,
  products: [{
    product_id: String,
    quantity: Number,
    price: Number
  }],
  status: {
    type: String,
    default: 'received'
  }
});

module.exports = mongoose.model('Order', orderSchema);