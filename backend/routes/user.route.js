const express = require("express");
const {signup,login,logout, buyerSignup, buyerlogin} = require("../controllers/user.controller");
const {auth} = require("../middlewares/auth");

const userRouter = express.Router();

//signup route
userRouter.post("/signup",signup);

userRouter.post("/buyer_signup",buyerSignup)

//login route
userRouter.post("/login",login);

userRouter.post("/buyerlogin",buyerlogin);

//logout route
userRouter.post("/logout",auth,logout) 

module.exports= userRouter ;