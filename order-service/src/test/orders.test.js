require('dotenv').config()
const request = require('supertest')
const app = require('../app');
const Inventory = require('../models/Inventory');
const CustomerMissingError = require('../errors/customer-missing-error');
let productId
const testInventoryData = {
    quantity: 100,
    price: 15.49
}

describe('Orders Test', () => {
    beforeAll(async () => {
        const product = await Inventory.create(testInventoryData)
        productId = product._id
    })

    test('Post a new order', async () =>{
        const res = await request(app).post('/api/orders')
        .send({
            customer_id: "665a39287e90b7001dcb0453",
            products: [{
                _id: productId,
                quantity: 2,
                price: 15.49
            }]
        })
        .expect(200)

        expect(res.body.status).toBe('received')
    })

    test('Shouldn\'t post a new order by customer missing', async () =>{
        const res = await request(app).post('/api/orders')
            .send({products: [{
                _id: productId,
                quantity: 2,
                price: 15.49
            }]})

        expect(res.status).toEqual(new CustomerMissingError().statusCode)
        expect(JSON.parse(res.error.text).error).toEqual(new CustomerMissingError().message)
    })
})