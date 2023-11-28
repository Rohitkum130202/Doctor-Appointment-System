const express = require("express");
const morgan = require("morgan");
const color = require("colors");
const router = require("./routes/userRoute");
const DbConnect = require("./config/db");
require("dotenv").config();

//Connecting to Db
DbConnect();

//Making App as method
const app = express();

//PORT
const PORT = process.env.PORT;

//Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Default routes for testing
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Server is Running",
  });
});

//Creating server to listen to port
app.listen(PORT, () => {
  console.log(
    `Server is Running in ${process.env.NODE_MODE} on PORT ${process.env.PORT}`
      .bgGreen.white
  );
});

app.use("/api/v1", router);
