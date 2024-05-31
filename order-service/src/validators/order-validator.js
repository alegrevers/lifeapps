const { isValidObjectId } = require("mongoose")
const CustomerMissingError = require("../errors/customer-missing-error")
const InvalidIdError = require("../errors/invalid-id-error")
const PriceMissingError = require("../errors/price-missing-error")
const ProductIdMissingError = require("../errors/product-id-missing-error")
const ProductMissingError = require("../errors/product-missing-error")
const QuantityMissingError = require("../errors/quantity-missing-error")

class OrderValidator {
    validateNewOrder (newOrderData) {
        if (!newOrderData) throw new QuantityMissingError()
        if (!newOrderData.customer_id) throw new CustomerMissingError()
        if (!newOrderData.products || !newOrderData.products.length) throw new ProductMissingError()

        newOrderData.products.forEach(product => {
            if (!product._id) throw new ProductIdMissingError()
            if (!product.quantity) throw new QuantityMissingError()
            if (!product.price) throw new PriceMissingError()

            this.validateId(product._id)
        })

        this.validateId(newOrderData.customer_id)
    }

    validateId (id) {
        if (!isValidObjectId(id)) throw new InvalidIdError()
    }
}

module.exports = OrderValidator