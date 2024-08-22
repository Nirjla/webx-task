const express = require('express')
const { createSubCategory } = require('../controllers/subcategory.controller')
const authenticateToken = require('../middlewares/authenticateToken.middleware')
const { getCategories } = require('../controllers/category.controller')
const router = express.Router()

router.post('/',authenticateToken, createSubCategory)
router.get('/',authenticateToken,getCategories)


module.exports = router