const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
require("dotenv").config();

const routes = require("./routes/routes");

// const UserModel = require("./model/model");

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.on("error", (error) => console.log(error));
mongoose.Promise = global.Promise;

const app = express();

app.use("/", routes);

app.listen(PORT, (error) => {
  if (!error) console.log("Server is Successfully Running on port " + PORT);
  else console.log("Error occurred, server can't start", error);
});
