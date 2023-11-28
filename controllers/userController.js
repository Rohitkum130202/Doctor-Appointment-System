const userModel = require("../models/userModel");
const doctorModel = require("../models/doctorModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const existinguser = await userModel.findOne({ email: req.body.email });
    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: "User Already Exist",
      });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    req.body.password = hashPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(200).send({
      success: true,
      message: "Registered Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found! Please register for login",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //Genrating token
    const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Login Controller ${error.message}`,
    });
  }
};
const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.password = undefined;
    // console.log(user);
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        message: "user found",
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Auth error",
    });
  }
};

//Doctor models Data Controllers

const ApplyDoctor = async (req, res) => {
  try {
    const newDocument = new DoctorModel(req.body); // Make sure to use the correct model name
    await newDocument.save();
    res.status(200).send({
      success: true,
      message: "Doctor data saved successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error saving doctor data",
    });
  }
};

module.exports = {
  registerController,
  loginController,
  authController,
  ApplyDoctor,
};
