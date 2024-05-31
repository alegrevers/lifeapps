const { isValidObjectId } = require("mongoose")
const InvalidIdError = require("../errors/id-not-found-error")
const QuantityMissingError = require("../errors/quantity-missing-error")
const PriceMissingError = require("../errors/price-missing-error")

class InventoryValidator {
    validateNewProduct (newProductData) {
        if (!newProductData) throw new QuantityMissingError()
        if (!newProductData.quantity) throw new QuantityMissingError()
        if (!newProductData.price) throw new PriceMissingError()
    }

    validateId (id) {
        if (!isValidObjectId(id)) throw new InvalidIdError()
    }
}

module.exports = InventoryValidator