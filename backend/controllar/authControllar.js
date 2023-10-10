const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Akash$02$1232";

const register = async (req, res) => {
    try { 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await User.create({ 
            username : req.body.username,
            email : req.body.email,  
            password : hashedPassword,
        })
          
        if(!newUser){
            return res.status(400).json({success:false, message:"User Name Must contain only alphanumeric characters and underscores."});
        }
        const data = {
            user:{
                id:newUser._id,
                role:newUser.role
            }
        }
        const token = jwt.sign(data, process.env.JWT_SECRET || JWT_SECRET,{expiresIn:"15d"});

        res.status(200).json({success:true,token,username:req.body.username, message:"User has been registered successfully"});

    } catch (error) {
        res.status(500).json({success:false, message:"Internal server error",error:error.message});
    }
};  

const login = async (req,res) => {
    try {
        const {username,email,password} = req.body;

        let user;
        if(email){
            user = await User.findOne({email:email});
        }else if(username){
            user = await User.findOne({username:username});
        }

        if(!user){   
            return res.status(404).json({success:false, message:"Please Login with correct credential"});
        }
        
        const checkPass = await bcrypt.compare(password, user.password);
        if(!checkPass){
            return res.status(401).json({success:false, message:"Please Login with correct credential"});
        }

        const token = jwt.sign({id:user._id,role:user.role}, process.env.JWT_SECRET || JWT_SECRET,{expiresIn:"15d"});
        
        res.cookie("accessToken",token,{
            httpOnly:true,
            expires:token.expiresIn
        }).status(200).json({success:true,token, message:"User has been logged in successfully",data:{id:user._id,role:user.role,username:user.username,email:user.email}});        

    } catch (error) {
        res.status(500).json({success:false, message:"Failed To login",error:error.message});
    }
} 

const EditUser = async (req,res) => {
    try {
        const {username,email,password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.findByIdAndUpdate(req.params.id,{
            username:username,
            email:email,
            password:hashedPassword
        },{new:true});
        if(!user){
            return res.status(404).json({success:false, message:"User not found"});
        }
        res.status(200).json({success:true, message:"User has been updated successfully",data:user});
    } catch (error) {
        res.status(500).json({success:false, message:"Failed To update",error:error.message});
    }
}

const DeleteUser = async (req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({success:false, message:"User not found"});
        }
        res.status(200).json({success:true, message:"User has been deleted successfully",data:user});
    } catch (error) {
        res.status(500).json({success:false, message:"Failed To delete",error:error.message});
    }
}

const getuser = async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({success:false, message:"User not found"});
        }
        res.status(200).json({success:true, message:"User has been fetched successfully",data:user});
    } catch (error) {
        res.status(500).json({success:false, message:"Failed To fetch",error:error.message});
    }
}


module.exports = { register,login,getuser,EditUser,DeleteUser}; 