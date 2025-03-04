import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();
  const userId = "67a73834735f3dd7c7af4465"; // Replace with actual logged-in user ID

  const [user, setUser] = useState({
    name: "",
    bio: "",
    email: "",
    phone: "",
    location: "",
    profileImage: "",
  });

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/users/${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          console.error("Error fetching user data:", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow-sm" style={{ width: "350px" }}>
        <div className="text-center">
          <img
            src={user.profileImage || "https://avatar.iran.liara.run/public"}
            alt="Profile"
            className="rounded-circle mb-3"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <h4 className="mb-1">{user.name}</h4>
          <p className="text-muted">{user.bio}</p>
        </div>

        <hr />

        <div>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Location:</strong> {user.location}
          </p>
        </div>

        <button
          className="btn btn-success w-100 mt-3"
          onClick={() => navigate("/user/edit-profile")}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
