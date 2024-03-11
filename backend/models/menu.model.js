const mongoose = require("mongoose");

const menuSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    lunch_timing: {
      type: String,
      required: true,
    },
    dinner_timing: {
      type: String,
      require: true,
    },
    tiffin_price: {
      type: String,
      require: true,
    },
    monday: {
      type: Object,
      require: true,
    },
    tuesday: {
      type: Object,
      require: true,
    },
    wednesday: {
      type: Object,
      require: true,
    },
    thursday: {
      type: Object,
      require: true,
    },
    friday: {
      type: Object,
      require: true,
    },
    saturday: {
      type: Object,
      require: true,
    },
    sunday: {
      type: Object,
      require: true,
    },
  },
  {
    versionKey: false,
  }
);

const MenuModel = mongoose.model("menu", menuSchema);

module.exports = {
  MenuModel,
};
