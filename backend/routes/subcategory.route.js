const express = require('express')
const { createSubCategory, getSubCategories, getSubCategoriesById } = require('../controllers/subcategory.controller')
const authenticateToken = require('../middlewares/authenticateToken.middleware')
const router = express.Router()

router.post('/', authenticateToken, createSubCategory)
router.get('/', getSubCategories)
router.get('/:id', getSubCategoriesById)


module.exports = router