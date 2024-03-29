const { UserModel } = require("../models/user.model");
const { BlacklistModel } = require("../models/blacklist.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BuyerUserModel } = require("../models/buyeruser.model");
require("dotenv").config();

const signup = async (req, res) => {
  const { lName, fName, email, password, gst, bussiness, address, phone } =
    req.body;
  try {
    const isUserExists = await UserModel.findOne({ email });
    if (isUserExists)
      return res.status(400).send({ msg: "User Already Exists Please Login" });
    const hash = await bcrypt.hash(password, +8);
    const newUser = new UserModel({
      lName,
      fName,
      address,
      gst,
      bussiness,
      phone,
      email,
      password: hash,
    });
    await newUser.save();
    res.status(201).send({ msg: "SignUp Sucessfull!", newUser });
  } catch (error) {
    console.log({ "/user/signup": error.message });
    res.status(500).send({ msg: error.message });
  }
};

const buyerSignup = async (req, res) => {
  const { lName, fName, email, password, address, phone } = req.body;
  try {
    const isUserExists = await BuyerUserModel.findOne({ email });
    if (isUserExists)
      return res.status(400).send({ msg: "User Already Exists Please Login" });
    const hash = await bcrypt.hash(password, +8);
    const newUser = new BuyerUserModel({
      lName,
      fName,
      address,
      phone,
      email,
      password: hash,
    });
    await newUser.save();
    res.status(201).send({ msg: "Buyer SignUp Sucessfull!", newUser });
  } catch (error) {
    console.log({ "/user/buyersignup": error.message });
    res.status(500).send({ msg: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserExists = await UserModel.findOne({ email });
    if (!isUserExists)
      return res
        .status(400)
        .send({ msg: "User Does Not Exists! Please Signup First!" });

    const result = await bcrypt.compare(password, isUserExists.password);

    if (result) {
      const access_token = jwt.sign({ userId: isUserExists._id }, "token1", {
        expiresIn: "7d",
      });
      res.status(200).send({
        msg: "Login SucessFull",
        token: access_token,
        user: isUserExists,
      });
    } else {
      res.status(400).send({ msg: "Wrong Credentials!" });
    }
  } catch (error) {
    console.log({ "/user/login": error.message });
    res.status(500).send({ msg: error.message });
  }
};

const buyerlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserExists = await BuyerUserModel.findOne({ email });
    if (!isUserExists)
      return res
        .status(400)
        .send({ msg: "User Does Not Exists! Please Signup First!" });

    const result = await bcrypt.compare(password, isUserExists.password);

    if (result) {
      const access_token = jwt.sign({ userId: isUserExists._id }, "token1", {
        expiresIn: "7d",
      });
      res.status(200).send({
        msg: "Login SucessFull",
        token: access_token,
        user: isUserExists,
      });
    } else {
      res.status(400).send({ msg: "Wrong Credentials!" });
    }
  } catch (error) {
    console.log({ "/buyerlogin/login": error.message });
    res.status(500).send({ msg: error.message });
  }
};


const logout = async (req, res) => {
  try {
    const token = req.body.headers.authorization.split(" ")[1];
    console.log(token);
    const blacklisted = new BlacklistModel({ token: token });
    await blacklisted.save();
    res.status(200).send({ msg: "Logout SucessFull" });
  } catch (error) {
    console.log({ "/user/logout": error.message });
    res.status(500).send({ msg: error.message });
  }
};

module.exports = { signup, login, logout, buyerSignup,buyerlogin };
