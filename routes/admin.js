const express = require('express');

const adminController = require('../controllers/admin')

const router = express.Router();

// /admin/routes => GET
router.get('/add-product', adminController.getAddProduct);
router.get('/products', adminController.getProducts);
router.get('/edit-product/:productID', adminController.getEditProduct);

// /admin/routes => POST
router.post('/add-product', adminController.postAddProduct);
router.post('/edit-product', adminController.postEditProduct)
router.post('/delete-product', adminController.postDeleteProduct);
module.exports = router;