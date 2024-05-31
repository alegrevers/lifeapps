const express = require('express');
const Inventory = require('../models/Inventory');
const InventoryValidator = require('../validators/inventory-validator');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    new InventoryValidator().validateNewProduct(req.body)

    const newProduct = await Inventory.create(req.body)

    res.status(200).json(newProduct);
  } catch (error) {
    next(error)
  }
});

module.exports = router;