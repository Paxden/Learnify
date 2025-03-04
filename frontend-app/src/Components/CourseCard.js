import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function CourseCard({ icon }) {
  const userId = "67a73834735f3dd7c7af4465";
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/users/${userId}/enrolled-courses`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch enrolled courses");
        }

        setEnrolledCourses(data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchEnrolledCourses();
  }, []);

  return (
    <div className="row gap-5 ">
      {enrolledCourses.length > 0 ? (
        enrolledCourses.map((course) => {
          // Ensure lessons exist before accessing index 0
          const firstLesson =
            course.lessons && course.lessons.length > 0
              ? course.lessons[0]
              : null;

          return (
            <div
              key={course._id}
              className="course-card border shadow-sm rounded p-3 col-10 col-md-3 "
            >
              <div className="d-flex gap-4 align-items-center">
                <FontAwesomeIcon
                  icon={icon}
                  className="text-success-emphasis fs-4"
                />
                <div
                  className="text-secondary text-truncate d-block"
                  style={{
                    width: "100%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {course.title}
                </div>
              </div>

              {/* Display only the first lesson if available */}
              {firstLesson ? (
                <div className="mt-2">
                  <h6 className="m-0 text-truncate">{firstLesson.title}</h6>
                  <small
                    className="text-muted text-truncate d-block"
                    style={{
                      width: "100%",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {firstLesson.content}
                  </small>
                </div>
              ) : (
                <p className="text-muted mt-3">No lessons available</p>
              )}

              {/* View Course Button */}
              <div className="d-flex mt-2">
                <button
                  className="btn ms-auto bg-success-subtle btn-sm "
                  onClick={() =>
                    navigate(`/user/enrolled-course/${course._id}`)
                  }
                >
                  View Course
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>No enrolled courses yet.</p>
      )}
    </div>
  );
}

export default CourseCard;
