const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const { body } = require('express-validator/check');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', 
    [
        body('title')
            .isString()
            .isLength({min: 3})
            .trim(),
        body('imageUrl')
            .isURL()
            .trim(),
        body('price')
            .isFloat()
            .trim(),
        body('description')
            .isString()
            .isLength({min: 8, max: 255})
            .trim()
    ],
    isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product',
    [
        body('title')
            .isString()
            .isLength({min: 3})
            .trim(),
        body('imageUrl')
            .isURL()
            .trim(),
        body('price')
            .isFloat()
            .trim(),
        body('description')
            .isString()
            .isLength({min: 8})
    ], isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
