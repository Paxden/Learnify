import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  faAward,
  faBookOpenReader,
  faShapes,
} from "@fortawesome/free-solid-svg-icons";
import CourseCard from "../../Components/CourseCard";
import AllCoursesCard from "../../Components/AllCoursesCard";

function AllCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.log("Error fetching Courses", error);
      }
    };

    fetchCourses();
  }, []);

  // Enrolling from course details
  const userId = "67a73834735f3dd7c7af4465"; // Get dynamically in real use

  const handleEnroll = async (courseId) => {
    if (!userId) {
      alert("You must be logged in to enroll!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/users/${userId}/enroll/${courseId}`,
        { method: "POST" }
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      alert("Course added successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="all-course py-3">
      <div className="container-lg">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Let's Start Learning</h3>
          <button
          className="btn btn-sm btn-success"
          onClick={() => navigate("/user/my-learning")}
        >
          My Learning
        </button>
        </div>

        <div className="cards mt-3">
          <CourseCard icon={faShapes} />
        </div>

        <div className="mt-5 d-flex justify-content-between align-items-center">
          <h3>What to learn next</h3>
        </div>

        <div className="cards row gap-3 mt-3">
          {courses.length > 0 ? (
            courses.map((course) => (
              <AllCoursesCard
                key={course._id}
                icon={faShapes}
                courseId={course._id}
                courseTitle={course.title}
                description={course.description}
                instructor={course.instructor}
                handleEnroll={handleEnroll}
              />
            ))
          ) : (
            <p className="text-center">No courses Available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllCourses;
