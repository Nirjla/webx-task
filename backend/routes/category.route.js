const express = require('express')
const { createCategory } = require('../controllers/category.controller')
const authenticateToken = require('../middlewares/authenticateToken.middleware')
const { getSubCategories } = require('../controllers/subcategory.controller')
const router = express.Router()

router.post('/', authenticateToken, createCategory)
router.get('/',authenticateToken,getSubCategories)

module.exports = router