const amqp = require('amqplib/callback_api');

function sendMessageToQueue(queue, message) {
  amqp.connect('amqp://rabbitmq', (err, conn) => {
    if (err) throw err;
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