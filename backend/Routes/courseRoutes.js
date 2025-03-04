const express = require("express");
const Course = require("../Models/courseModel");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Multer config for PDF upload
const storage = multer.diskStorage({
  destination: "uploads/", // Save PDFs in uploads folder
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// Get all Course
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(201).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single Course
router.get("/:courseId", async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create  a new course
router.post("/", async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload Lesson PDF
router.post(
  "/:courseId/lessons",
  upload.single("pdf"),
  async (req, res) => {
    try {
      const { title, description } = req.body; 
      const courseId = req.params.courseId;

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded!" });
      }

      if (!title || !description) {
        return res
          .status(400)
          .json({ message: "Title and description are required!" });
      }

      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found!" });
      }

      const newLesson = {
        title,
        description,
        content: req.file.path, // Save file path
      };

      course.lessons.push(newLesson);
      await course.save();

      res.status(201).json({
        message: "Lesson added successfully",
        lesson: newLesson,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
