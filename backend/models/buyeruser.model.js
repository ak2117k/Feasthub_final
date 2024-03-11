const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
      unique: true,
    },
    lName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false,
  }
);

const BuyerUserModel = mongoose.model("buyers", userSchema);

module.exports = {
  BuyerUserModel,
};
