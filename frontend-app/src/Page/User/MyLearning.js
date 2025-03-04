import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

function MyLearning() {
  const userId = "67a73834735f3dd7c7af4465";
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const { courseId } = useParams(); // Get courseId from URL

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

  // ✅ Handle Unenroll Button Click
  const handleUnenroll = async (courseId) => {
    if (!courseId) {
      alert("Course ID is missing!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/users/${userId}/unenroll/${courseId}`,
        { method: "DELETE" }
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      alert("Successfully unenrolled from the course!");

      // ✅ Remove unenrolled course from UI
      setEnrolledCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="my-learning my-5">
      <div className="container-lg">
        <div className="">
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
                  className=" border my-learning-card rounded p-3 mb-3 "
                >
                  <div className="d-flex gap-4 align-items-center">
                    <div
                      className=" text-truncate d-block"
                      style={{
                        width: "100%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <h5>{course.title}</h5>
                      <p className="text-secondary">
                        {course.description}
                      </p>{" "}
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
                  <div className="d-flex mt-2 ">
                    {/* ✅ Remove (Unenroll) Button */}

                    <div className="d-flex ">
                      <div className="mx-auto">
                        <button
                          className="btn  btn-sm btn-danger me-3"
                          onClick={() => handleUnenroll(course._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <button
                      className="btn btn-sm  bg-success-subtle btn-sm "
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
      </div>
    </div>
  );
}

export default MyLearning;
