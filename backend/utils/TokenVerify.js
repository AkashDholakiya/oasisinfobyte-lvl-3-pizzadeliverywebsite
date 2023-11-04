const jwt = require('jsonwebtoken');
require('dotenv').config();

const TokenVerify = (req,res,next) => { 
    const token = req.header('auth-token');
    console.log("token: ",token);
    if(!token){
        return res.status(401).json({success:false, message:"Unauthorized"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) { 
        return res.status(401).json({success:false, message:"Unauthorized"});
    }
}

const AdminVerify = (req,res,next) => {
    TokenVerify(req,res,next , () => {
        if(req.user.role !== "admin"){
            return res.status(401).json({success:false, message:"Unauthorized"});
        }
        next();
    });
}

const UserVerify = (req,res,next) => {  
    TokenVerify(req,res,next , () => {
        if(req.user.id === req.params.id || req.user.role === "user"){
            next();
        }else{
            return res.status(401).json({success:false, message:"Unauthorized"});
        }
    });
}
module.exports = {TokenVerify,AdminVerify,UserVerify};