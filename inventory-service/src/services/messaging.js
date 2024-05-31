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

function connectToRabbitMQ(attempts, callback) {
  if (attempts <= 0) {
    console.error("Failed to connect to RabbitMQ after multiple attempts");
    return;
  }

  amqp.connect('amqp://rabbitmq:5672', (err, conn) => {
    if (err) {
      console.error(`Failed to connect to RabbitMQ, attempts left: ${attempts - 1}`, err);
      setTimeout(() => connectToRabbitMQ(attempts - 1, callback), 5000); // retry after 5 seconds
    } else {
      callback(conn);
    }
  });
}

function receiveMessagesFromQueue() {
  connectToRabbitMQ(10, (conn) => {
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