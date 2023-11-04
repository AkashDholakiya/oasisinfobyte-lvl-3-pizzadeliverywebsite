const express = require('express');
const router = express.Router();
const {TokenVerify} = require('../utils/TokenVerify');
const {AddToCart, GetCartItem} = require('../controllar/CartControllar');

router.post('/addtocart', TokenVerify , AddToCart);
router.get('/getcartitem', TokenVerify , GetCartItem);

module.exports = router;

 