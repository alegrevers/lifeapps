const amqp = require('amqplib/callback_api');
const Inventory = require('../models/Inventory');
const InventoryValidator = require('../validators/inventory-validator');
const IdNotFoundError = require('../errors/id-not-found-error');
const OutOfStockError = require('../errors/out-of-stock-error');

function updateInventory(products) {
  products.forEach(async (product) => {
    new InventoryValidator().validateId(product._id)
    const inventoryItem = await Inventory.findOne({ _id: product._id });
    if (inventoryItem) {
      inventoryItem.quantity -= product.quantity;

      if (inventoryItem < 0) throw new OutOfStockError()

      await inventoryItem.save();
    } else {
      throw new IdNotFoundError()
    }
  });
}

async function connectToRabbitMQ(attempts, callback) {
  if (attempts <= 0) {
    console.error("Failed to connect to RabbitMQ after multiple attempts");
    return;
  }

  await amqp.connect('amqp://rabbitmq:5672', (err, conn) => {
    if (err) {
      console.error(`Failed to connect to RabbitMQ, attempts left: ${attempts - 1}`, err);
      setTimeout(() => connectToRabbitMQ(attempts - 1, callback), 5000); // retry after 5 seconds
    } else {
      callback(conn);
    }
  });
}

async function receiveMessagesFromQueue() {
  await connectToRabbitMQ(10, (conn) => {
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