const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PizzaSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      base: {
        type: String,
        required: true,
      },
      sauce: {
        type: String,
        required: true,
      },
      cheese: {
        type: String,
        required: true,
      },
      toppings: {
        type: [String],
        required: true,
      },
      imageUrl: {
        type: String,
      },
      isVegetarian: {
        type: Boolean,
        default: false,
      },
      isSpicy: {
        type: Boolean,
        default: false,
      },
});

const Pizza = mongoose.model('pizza', PizzaSchema);
module.exports = Pizza;