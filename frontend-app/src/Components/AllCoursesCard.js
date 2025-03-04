import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function AllCoursesCard({
  courseId,
  icon,
  courseTitle,
  description,
  instructor,
  handleEnroll, // ✅ Ensure handleEnroll is received as a prop
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEnrollClick = async (event) => {
    event.stopPropagation(); // Prevents triggering navigation when clicking "Add Course"

    if (handleEnroll) {
      setLoading(true);
      await handleEnroll(courseId);
      setLoading(false);
    } else {
      console.error("handleEnroll function is missing!");
    }
  };

  return (
    <div
      onClick={() => navigate(`/user/course/${courseId}`)} 
      className="all-courses-card border shadow-sm rounded p-3 col-10 col-md-3"
    >
      <div className="d-flex gap-4 align-items-center">
        <FontAwesomeIcon icon={icon} className="text-success-emphasis fs-4" />
        <div
          className="text-truncate d-block mt-2 text-secondary h6"
          style={{
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {courseTitle}
        </div>
      </div>
      <small
        className="text-truncate d-block"
        style={{
          width: "100%",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {description}
      </small>

      <div className="d-flex justify-content-between align-items-center mt-2">
        <p className="m-0">By: {instructor}</p>
        <button
          className="bg-info-subtle btn-sm btn mt-2"
          onClick={handleEnrollClick} // ✅ Use the function properly
          disabled={loading}
        >
          {loading ? "Adding..." : "+ Add Course"}
        </button>
      </div>
    </div>
  );
}

export default AllCoursesCard;
