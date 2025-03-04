const express = require("express");
const User = require("../Models/userModel");
const Course = require("../Models/courseModel");
const bcrypt = require("bcrypt");
const router = express.Router();


// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Email or password" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Email or password" });
    }

    res.status(201).json({ message: "Login successfully" });
  } catch (error) {
    console.log("error during login", error);
    res.status(500).json({ message: "internal server error, try again later" });
  }
});

// Register a new user
router.post("/", async (req, res) => {
  const { name, email, password, bio } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exist. Please use a different email.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      bio,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.log("Error during registration", error);
    res
      .status(500)
      .json({ message: "internal server error, please try again" });
  }
});

// Get all Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get User by ID
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "user not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Update User Profile
router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name, email, bio, phone, location } = req.body; // Fields to update

  try {
    // Find and update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, bio, phone, location },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// User Enrolled course
router.post("/:userId/enroll/:courseId", async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    if (!userId || !courseId) {
      return res
        .status(400)
        .json({ error: "User ID and Course ID are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Ensure enrolledCourses exists on user
    if (!user.enrolledCourses) {
      user.enrolledCourses = [];
    }

    // Prevent duplicate enrollment
    if (user.enrolledCourses.includes(courseId)) {
      return res
        .status(400)
        .json({ error: "User already enrolled in this course" });
    }

    // Add course to enrolledCourses
    user.enrolledCourses.push(courseId);
    await user.save();

    res.status(200).json({ message: "Course added successfully", user });
  } catch (error) {
    console.error("Server error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

// Get Enrolled Coourses
router.get("/:userId/enrolled-courses", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate({
      path: "enrolledCourses",
      populate: { path: "lessons", select: "title" }, // Populate lessons
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ courses: user.enrolledCourses });
  } catch (error) {
    console.error("Server error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

// Unenroll route
router.delete("/:userId/unenroll/:courseId", async (req, res) => {
  const { userId, courseId } = req.params;

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    // Ensure enrolledCourses and enrolledUsers exist
    user.enrolledCourses = user.enrolledCourses || [];
    course.enrolledUsers = course.enrolledUsers || [];

    console.log("Before unenroll:", user.enrolledCourses, course.enrolledUsers);

    // Remove course from user's enrolledCourses
    user.enrolledCourses = user.enrolledCourses.filter(
      (id) => id.toString() !== courseId
    );
    await user.save();

    // Remove user from course's enrolledUsers
    course.enrolledUsers = course.enrolledUsers.filter(
      (id) => id.toString() !== userId
    );
    await course.save();

    console.log("After unenroll:", user.enrolledCourses, course.enrolledUsers);

    res.json({ message: "Successfully unenrolled from course" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
