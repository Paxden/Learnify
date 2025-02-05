const express = require("express");
const Course = require("../Models/courseModel");

const router = express.Router();

// Get all Course
app.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});


// create a new course
app.post()