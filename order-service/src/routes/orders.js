const express = require('express');
const Order = require('../models/Order');
const { sendMessageToQueue } = require('../services/messaging');
const OrderValidator = require('../validators/order-validator');
const Inventory = require('../models/Inventory');
const IdNotFoundError = require('../errors/id-not-found-error');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    let productsFound = []
    const { customer_id, products } = req.body;

    new OrderValidator().validateNewOrder(req.body)

    for (const product of products) {
      const foundProduct = await Inventory.findById(product._id)
      if (foundProduct) productsFound.push(foundProduct)
    }

    if (productsFound.length < products.length) throw new IdNotFoundError()

    const newOrder = new Order({ customer_id, products });

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
    next(err)
  }
});

module.exports = router;