const express = require('express');
const router = express.Router();
const {TokenVerify} = require('../utils/TokenVerify');
const {AddToCart, GetCartItem,DeleteCartItem} = require('../controllar/CartControllar');

router.post('/addtocart', TokenVerify , AddToCart);
router.get('/getcartitem', TokenVerify , GetCartItem);
router.delete('/deletecartitem/:id', TokenVerify , DeleteCartItem);

module.exports = router;

 