const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const courseRoutes = require("./Routes/courseRoutes");
const userRoutes = require("./Routes/userRoutes");

// load environment variables
dotenv.config();

// Initialize express app
const app = express();

// middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT"],
  })
);
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.path}`);
  next();
});

// Connect to mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Mongoose connected. Server running on port ${process.env.PORT}`
      );
    });
  })
  .catch((err) => console.log(err));

// Routes
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(
      `Route: ${r.route.path} [${Object.keys(r.route.methods)
        .join(", ")
        .toUpperCase()}]`
    );
  }
});
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);
