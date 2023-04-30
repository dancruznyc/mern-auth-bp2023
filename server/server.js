const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//connect to db
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));

// import routes
const authRoutes = require("./routes/auth");

// app middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
//app.use(cors()); //allows all origins
if (process.send.NODE_ENV === "development") {
  app.use(cors({ origin: `http://localhost:3001` }));
}

// router middleware
app.use("/api", authRoutes);

const port = process.env.PORT;
app.listen(port, () =>
  console.log(`API running on port ${port} - ${process.env.NODE_ENV}`)
);
