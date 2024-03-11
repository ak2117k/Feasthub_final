const { menu } = require("../controllers/menu.controller");
const express = require("express");
const {
  signup,
  login,
  logout,
  buyerSignup,
  buyerlogin,
} = require("../controllers/user.controller");
const { auth } = require("../middlewares/auth");

const menuRouter = express.Router();

menuRouter.post("/menu", menu);

module.exports = {
  menuRouter,
};
