const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Akash$02$1232";
const nodemailer = require('nodemailer');

const register = async (req, res) => {
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role
        })

        if (!newUser) {
            return res.status(400).json({ success: false, message: "User Name Must contain only alphanumeric characters and underscores." });
        }
        const data = {
            user: {
                id: newUser._id,
                role: newUser.role
            }
        }
        const token = jwt.sign(data, process.env.JWT_SECRET || JWT_SECRET, { expiresIn: "15d" });

        res.status(200).json({ success: true, token, username: req.body.username, message: "User has been registered successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { nameemail, password, role } = req.body;
        const email = nameemail.includes('@') ? nameemail : null;
        const username = nameemail.includes('@') ? null : nameemail;
        let user;
        if (email) {
            user = await User.findOne({ email: email, role: role });
        } else if (username) {
            user = await User.findOne({ username: username, role: role });
        }

        if (!user) {
            return res.status(404).json({ success: false, message: "Please Login with correct credential" });
        }



        const checkPass = await bcrypt.compare(password, user.password);
        if (!checkPass) {
            return res.status(401).json({ success: false, message: "Please Login with correct credential" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || JWT_SECRET, { expiresIn: "15d" });

        res.cookie("accessToken", token, {
            httpOnly: true,
            expires: token.expiresIn
        }).status(200).json({ success: true, token, message: "User has been logged in successfully", data: { id: user._id, role: user.role, username: user.username, email: user.email } });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed To login", error: error.message });
    }
}

const EditUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.findByIdAndUpdate(req.params.id, {
            username: username,
            email: email,
            password: hashedPassword
        }, { new: true });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User has been updated successfully", data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed To update", error: error.message });
    }
}

const DeleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User has been deleted successfully", data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed To delete", error: error.message });
    }
}

const getuser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User has been fetched successfully", data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed To fetch", error: error.message });
    }
}

const ForgotPass = async (req, res) => {
    const { email, role } = req.body;
    try {
        const user = await User.findOne({ email: email, role: role });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || JWT_SECRET, { expiresIn: "300s" });
    
        const setusertoken = await User.findByIdAndUpdate({_id:user._id},{verifytoken:token},{new:true})
    
    
        if(setusertoken){
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.USER_EMAIL,
                    pass: process.env.USER_PASSWORD
                }
            });
    
            var mailOptions = {
                from: process.env.USER_EMAIL,
                to: email,
                subject: 'Reset Password',
                html: `
                <h4>Reset Password</h4>
                <p>This Link is valid for 5 minutes</p>
                <a href="http://localhost:3000/reset-password/${user._id}/${setusertoken.verifytoken}">Click Here to reset your password</a>
                <p>&#169; all right reserved</p>`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ success: false, message: "Failed To send Email", error: error.message });
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).json({ success: true, message: "Email Sent Successfully" });
                }
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed To send Email", error: error.message });
    }

}

const validateUser = async (req,res) => {
    const { id, token } = req.params;
    try {
        const user = await User.findOne({_id:id,verifytoken:token});

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET || JWT_SECRET);
        if(!user || !verifyToken){
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, message: "User has been fetched successfully", data: user });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed To fetch", error: error.message });
    }
}

const ResetPassword = async (req,res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    try {
        const user = await User.findOne({_id:id,verifytoken:token});

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET || JWT_SECRET);
        if(!user || !verifyToken){
            console.log("User not found");
            return res.status(404).json({ success: false, message: "User not found" });
        }
        console.log("User found");
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const setpassword = await User.findByIdAndUpdate({_id:id},{password:hashedPassword});

        if(!setpassword){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, message: "User has been fetched successfully"});
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed To fetch", error: error.message });
    }
}


module.exports = { register, login, getuser, EditUser, DeleteUser, ForgotPass,validateUser, ResetPassword }; 