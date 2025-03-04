import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./User.css";

function UserDashboard() {
  const location = useLocation();
  const [active, setActive] = useState(null);
  const currentYear = new Date().getFullYear();
  const profileImage = "https://avatar.iran.liara.run/public";

  const backgroundStyle = {
    backgroundImage: `url(${profileImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  };

  const bgstyle2 = {
    backgroundImage: `url(${profileImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: "50%",
    width: "80px",
    height: "80px",
  };

  return (
    <div className="user-dashboard">
      <nav className="shadow-sm py-2">
        <div className="container-lg  d-flex justify-content-between align-items-center">
          <div className="brand-name">
            <Link to="/user" className="h3 text-success">
              Learnify
            </Link>
          </div>
          <ul className="nav-links">
            <li>
              <Link
                to="/user"
                className={location.pathname === "/user" ? "active" : ""}
              >
                All Courses
              </Link>
            </li>
            <li>
              <Link
                to="/user/my-learning"
                className={
                  location.pathname === "/user/my-learning" ? "active" : ""
                }
              >
                My Learning
              </Link>
            </li>
            <li>
              <Link
                to="/teach"
                className={location.pathname === "/user/teach" ? "active" : ""}
              >
                Teach on Learnify
              </Link>
            </li>
          </ul>

          <div className="profile d-flex align-items-center gap-3">
            <div className="profile-img">
              <img className="shadow" style={backgroundStyle} alt="" />
            </div>
            <p className="p-0  m-0">User One</p>
          </div>
        </div>
      </nav>

      <div className=" container-lg py-4 d-flex gap-5 align-items-center">
        <div className="profile-img">
          <img className="shadow" style={bgstyle2} alt="" />
        </div>
        <div>
          <p className=" m-0 h4">Welcome User </p>
          <a href="/user/profile" className="text-success">
            <small>Edit Profile</small>
          </a>
        </div>
      </div>

      <Outlet />

      <footer className="bg-secondary-subtle">
        <div className="container-lg mt-5 p-3">
          <div className="teach d-flex justify-content-between align-items-center">
            <div>
              <h5>Teach the world online</h5>
              <p>
                Create an online video course, reach students across the globe,
                and earn money
              </p>
            </div>
            <div className="btn btn-sm btn-outline-success">
              Teach on Learnify
            </div>
          </div>
        </div>
        <div className="bg-secondary text-light text-center">
          <div className="container-lg p-3">
            <div className=" h3">Learnify</div>
            <p className="mb-0">&copy; {currentYear} All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default UserDashboard;
