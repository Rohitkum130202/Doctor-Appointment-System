require("dotenv").config();
const mongoose = require("mongoose");
const color = require("colors");

const DbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to mongoDB Database : ${mongoose.connection.host}`.bgBlue
    );
  } catch (error) {
    console.log(`Error while Connecting to Database : ${error}`);
  }
};

module.exports = DbConnect;
