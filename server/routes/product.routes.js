const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controller')


router.post('/', productController.createProduct);
// routes/product.routes.js
router.get('/', productController.getAllProducts);


module.exports = router;