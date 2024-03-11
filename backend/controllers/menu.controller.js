const { MenuModel } = require("../models/menu.model");
require("dotenv").config();

const menu = async (req, res) => {
//   console.log(req);
  try {
    const menuModel = new MenuModel(req.body);
    await menuModel.save();
    res.status(201).send({ msg: "Menu Model", menuModel });
  } catch (error) {
    console.log({ "Menu Model": error.message });
    res.status(500).send({ msg: error.message });
  }
};

module.exports = {
  menu,
};
