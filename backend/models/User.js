const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true, 
    },
    verifyEmail:{
        type: Boolean,
        default: false,
    }, 
    password:{       
        type: String,
        required: true,
    },
    role:{
        type:String,
        default: "user",
    },
    verifytoken:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
 
module.exports = mongoose.model("User", userSchema);