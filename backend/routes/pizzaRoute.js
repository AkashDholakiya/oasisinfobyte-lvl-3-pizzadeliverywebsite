const express = require('express');
const router = express.Router();
const {AddPizza,GetPizza} = require('../controllar/PizzaControllar');

router.post('/addpizza', AddPizza); 
router.get('/getpizza', GetPizza);

module.exports = router;