const mongoose = require("mongoose");
require("dotenv").config();
const { DB_URI } = process.env;

module.exports = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("DB Connection Successful!");
  } catch (err) {
    console.error(err);
  }
};
