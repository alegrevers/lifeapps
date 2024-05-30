const express = require('express');
const Order = require('../models/Order');
const { sendMessageToQueue } = require('../services/messaging');

const router = express.Router();

router.post('/', async (req, res) => {
  const { customer_id, products } = req.body;

  const newOrder = new Order({ customer_id, products });

  try {
    await newOrder.save();
    await sendMessageToQueue('order_created', {
      order_id: newOrder._id,
      products
    });
    res.status(200).json({
      order_id: newOrder._id,
      status: newOrder.status,
      message: 'Order successfully placed.'
    });
  } catch (err) {
    res.status(500).json({ message: 'Error placing order', error: err });
  }
});

module.exports = router;