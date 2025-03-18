const express = require('express')
const router = express.Router()
const {createCheckout} = require('../collections/checkout.collection')

router.post('/checkout',createCheckout)

module.exports = router