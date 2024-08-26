const express = require('express')
const { createCategory, getCategories } = require('../controllers/category.controller')
const authenticateToken = require('../middlewares/authenticateToken.middleware')
const router = express.Router()

router.post('/', authenticateToken, createCategory)
router.get('/',authenticateToken,getCategories)

module.exports = router