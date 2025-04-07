const express = require('express')
const router = express.Router()
const productController = require('../controllers/ProductController')

router.post('/products', productController.addProduct)
router.get('/products', productController.getProducts)
router.put('/products/:id', productController.updateProduct)
router.delete('/products/:id', productController.deleteProduct)
router.post('/transactions', productController.addTransaction)
router.get('/transactions', productController.getTransactions)

module.exports = router