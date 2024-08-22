const express = require('express')
const { createSubCategory } = require('../controllers/subcategory.controller')
const authenticateToken = require('../middlewares/authenticateToken.middleware')
const router = express.Router()

router.post('/',authenticateToken, createSubCategory)