const express = require("express");
const {
  registerController,
  loginController,
  authController,
  ApplyDoctor,
} = require("../controllers/userController");
const AuthMiddlewares = require("../middlewares/AuthMiddlewares");
const router = express.Router();

//Route for Registration
router.post("/user/register", registerController);

//Roue for Login
router.post("/user/login", loginController);

//Auth post
router.post("/user/getuserData", AuthMiddlewares, authController);

router.post("/user/applydoctor", ApplyDoctor);
module.exports = router;
