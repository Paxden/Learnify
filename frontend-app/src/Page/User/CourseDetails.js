import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CourseDetails() {
  const { courseId } = useParams(); // Get courseId from URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = "67a73834735f3dd7c7af4465";
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/courses/${courseId}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch course details");
        }

        setCourse(data);
        setIsEnrolled(data.enrolledUsers?.includes(userId)); // Check if enrolled
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleEnroll = async () => {
    const userId = "67a73834735f3dd7c7af4465";
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
      navigate(`/user/enrolled-course/${course._id}`);
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) return <p>Loading course details...</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    <div className="container-lg mt-4">
      <h2>{course.title}</h2>
      <p className="text-muted">{course.description}</p>

      <h4 className="mt-4">Lessons</h4>
      <ul className="list-group">
        {course.lessons.length > 0 ? (
          course.lessons.map((lesson) => (
            <li key={lesson._id} className="list-group-item">
              <h6>{lesson.title}</h6>
              <p>{lesson.content}</p>
            </li>
          ))
        ) : (
          <div className="container-lg">
            <p>No lessons available.</p>
          </div>
        )}
      </ul>

      {/* Enroll Button */}
      <div className="d-flex">
        <button
          className="mx-auto mt-3 btn btn-sm btn-success"
          onClick={() => handleEnroll(courseId)}
          disabled={isEnrolled || enrolling}
        >
          {isEnrolled
            ? "Already Enrolled"
            : enrolling
            ? "Enrolling..."
            : "Enroll Course"}
        </button>
      </div>
    </div>
  );
}

export default CourseDetails;
