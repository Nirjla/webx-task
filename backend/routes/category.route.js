const express = require('express')
const { createCategory, getCategories, getProductsByCategory } = require('../controllers/category.controller')
const authenticateToken = require('../middlewares/authenticateToken.middleware')
const router = express.Router()

router.post('/', authenticateToken, createCategory)
router.get('/',getCategories)
router.get('/:id', getProductsByCategory)
module.exports = router