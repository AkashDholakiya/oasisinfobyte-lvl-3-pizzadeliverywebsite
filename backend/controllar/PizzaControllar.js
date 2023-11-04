const Pizza = require('../models/Pizza');


const AddPizza = async (req, res) => {
    const {name, description, price, base, sauce, cheese, toppings, imageUrl, isVegetarian, isSpicy} = req.body;
    try {
        const pizza = await Pizza.create(
            {name, description, price, base, sauce, cheese, toppings, imageUrl, isVegetarian, isSpicy}
        );
 
        res.status(201).json({status: 'success', data: pizza})
        
    } catch (error) {
        res.status(400).json({status: 'fail',message: error.message,});
    }
}

const GetPizza = async (req, res) => {
    try {
        const pizza = await Pizza.find();
        res.status(200).json({status: 'success', data: pizza})
    } catch (error) {
        res.status(400).json({status: 'fail',message: error.message,});
    }
}



module.exports = {AddPizza,GetPizza};
