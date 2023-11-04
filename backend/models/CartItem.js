const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    pizza:{
        type: Schema.Types.ObjectId,
        ref: 'pizza'
    },
    quantity:{
        type: Number,
        default: 1
    },
    price:{
        type: Number,
        required: true
    }
});

const CartItem = mongoose.model('cartItem', CartItemSchema);
module.exports = CartItem;