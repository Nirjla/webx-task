const express = require('express')
const { createCategory } = require('../controllers/category.controller')
const authenticateToken = require('../middlewares/authenticateToken.middleware')
const router = express.Router()

router.post('/', authenticateToken, createCategory)

module.exports = router