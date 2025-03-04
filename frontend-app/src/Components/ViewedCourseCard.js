import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ViewedCourseCard() {
  return (
    <div className=" course-card border shadow-sm rounded p-3 col-10 col-md-3 d-flex gap-5 align-items-center ">
      <FontAwesomeIcon icon={icon} className="text-success-emphasis fs-4" />
      <div>
        <div className="text-secondary">{courseTitle}</div>
        <h6>{lessonTitle}</h6>
      </div>
    </div>
  );
}

export default ViewedCourseCard;
