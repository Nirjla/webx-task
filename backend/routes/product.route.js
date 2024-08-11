const express = require('express')
const { createProduct } = require('../controllers/product.controller')
const authenticateToken = require('../middlewares/authenticateToken.middleware')
const router = express.Router()

router.post('/', authenticateToken, createProduct)