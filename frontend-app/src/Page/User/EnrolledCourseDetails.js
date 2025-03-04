import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EnrolledCourseDetails() {
  const { courseId } = useParams(); // Get courseId from URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (loading) {
    return <p>Loading course details...</p>;
  }

  if (!course) {
    return <p>Course not found.</p>;
  }

  return (
    <div className="container-lg mt-4">
      <h2>{course.title}</h2>
      <p className="text-muted">{course.description}</p>

      <h4 className="mt-4">Lessons</h4>
      <ul className="list-group">
        {course.lessons.length > 0 ? (
          <div>
            {course.lessons.map((lesson) => (
              <li key={lesson._id} className="list-group-item">
                <h6>{lesson.title}</h6>
                <p>{lesson.content}</p>
                <div className="d-flex">
                  <div className="ms-auto btn btn-sm btn-success">
                    Download content
                  </div>
                </div>
              </li>
            ))}
            <div className="btn mt-3 btn-sm btn-secondary">Complete Course</div>
          </div>
        ) : (
          <div className="container-lg">
            <p>No lessons available.</p>
          </div>
        )}
      </ul>
    </div>
  );
}

export default EnrolledCourseDetails;
