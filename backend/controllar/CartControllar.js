const cartItem = require('../models/CartItem');
const Pizza = require('../models/Pizza');


const AddToCart = async (req, res) => {
    const {pizzaId, quantity} = req.body;
    try {
        const pizza = await Pizza.findById(pizzaId);
        if(!pizza){
            return res.status(400).json({success:false, message:"Pizza not found"});
        }
        const CartItem = await cartItem.create({
            user: req.user._id,
            pizza: pizzaId,
            quantity: quantity,
            price: pizza.price
        });
        res.status(201).json({success:true, data:CartItem});
    } catch (error) {
        res.status(400).json({success:false, message: error.message});
    }
}

const GetCartItem = async (req, res) => {
    try {
        const cartItems = await cartItem.find({user: req.user._id}).populate('pizza');
        res.status(200).json({success:true, data:cartItems});
    } catch (error) {
        res.status(400).json({success:false, message: error.message});
    }
}

module.exports = {AddToCart,GetCartItem};