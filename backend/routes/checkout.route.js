const express = require('express')
const authenticateToken = require('../middlewares/authenticateToken.middleware')
const { checkout } = require('../controllers/checkout.controller')
const router = express.Router()
router.post('/',authenticateToken, checkout )

module.exports = router