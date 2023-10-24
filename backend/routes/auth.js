const express = require('express');
const { register,login,getuser,EditUser,DeleteUser,ForgotPass,validateUser,ResetPassword } = require('../controllar/authControllar');
const router = express.Router();
const {TokenVerify} = require('../utils/TokenVerify');

router.post('/login', login); 
router.post('/register' ,register);
router.get('/getuser/:id', TokenVerify, getuser)
router.put('/edituser/:id', TokenVerify, EditUser)
router.delete('/deleteuser/:id', TokenVerify, DeleteUser)
router.post('/forgot-password', ForgotPass)
router.get('/reset-password/:id/:token', validateUser)
router.post('/reset-password/:id/:token', ResetPassword)
   
  
module.exports = router;  