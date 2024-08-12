const express = require('express')
const authenticateToken = require("../middlewares/authenticateToken.middleware")
const { addToCart, getCartItems, updateQuantity, deleteFromCart } = require("../controllers/cart.controller")
const router = express.Router()

router.post('/', authenticateToken, addToCart)
router.get('/', authenticateToken, getCartItems)
router.put('/:id', authenticateToken, updateQuantity)
router.delete('/:id', authenticateToken, deleteFromCart)

module.exports = router