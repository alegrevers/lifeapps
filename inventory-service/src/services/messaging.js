const amqp = require('amqplib/callback_api');
const Inventory = require('../models/Inventory');

function updateInventory(products) {
  products.forEach(async (product) => {
    const inventoryItem = await Inventory.findOne({ product_id: product.product_id });
    if (inventoryItem) {
      inventoryItem.quantity -= product.quantity;
      await inventoryItem.save();
    }
  });
}

function receiveMessagesFromQueue() {
  amqp.connect('amqp://rabbitmq', (err, conn) => {
    if (err) throw err;
    conn.createChannel((err, ch) => {
      if (err) throw err;
      const queue = 'order_created';
      ch.assertQueue(queue, { durable: false });
      ch.consume(queue, (msg) => {
        console.log(" [x] Received %s", msg.content.toString());
        const order = JSON.parse(msg.content.toString());
        updateInventory(order.products);
      }, { noAck: true });
    });
  });
}

module.exports = { receiveMessagesFromQueue };