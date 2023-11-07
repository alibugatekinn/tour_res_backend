const express=require('express');
const router= express.Router();
const {signupUser,loginUser,logoutUser}= require('../Controllers/userController');
const {authenticateUser} =require('../Controllers/authController');

router.post('/signup' ,signupUser ); 
router.post('/login' ,loginUser ); 
router.post('/logout' ,logoutUser); 
router.get('/isUser',authenticateUser);

module.exports=router;