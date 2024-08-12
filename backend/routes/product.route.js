const express = require('express')
const { createProduct, getProducts, getProductById } = require('../controllers/product.controller')
const authenticateToken = require('../middlewares/authenticateToken.middleware')
const {storage} = require('../storage/storage')
const multer = require('multer')
const router = express.Router()
const upload = multer({ storage })

router.post('/', authenticateToken, upload.single('image'), createProduct)
router.get('/', getProducts)
router.get('/:id', getProductById)
module.exports = router