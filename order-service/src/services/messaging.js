const amqp = require('amqplib/callback_api');

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

function sendMessageToQueue(queue, message) {
  connectToRabbitMQ(10, (conn) => {
    conn.createChannel((err, ch) => {
      if (err) throw err;
      ch.assertQueue(queue, { durable: false });
      ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
      console.log(" [x] Sent %s", message);
    });
    setTimeout(() => { conn.close(); }, 500);
  });
}

module.exports = { sendMessageToQueue };