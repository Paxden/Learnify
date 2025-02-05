const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// load environment variables
dotenv.config();

// Initialize express app
const app = express();

// middleware
app.use(cors());
app.use(express.json);
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.path}`);
});

// Connect to mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Mongoose connected");
    });
  })
  .catch((err) => console.log(err));

// ROutes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
