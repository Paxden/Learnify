import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const userId = "67a73834735f3dd7c7af4465"; // Replace with actual user ID from context/auth

  const [user, setUser] = useState({
    name: "",
    bio: "",
    email: "",
    phone: "",
    location: "",
    profileImage: "https://avatar.iran.liara.run/public",
  });

  const [previewImage, setPreviewImage] = useState(user.profileImage);

  // Fetch user data from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/users/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user");
        const data = await response.json();
        setUser(data);
        setPreviewImage(data.profileImage);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      alert("Profile updated successfully!");
      navigate("/user/profile"); // Redirect after update
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
        <h4 className="text-center mb-4">Edit Profile</h4>

        {/* Profile Image Preview */}
        <div className="text-center mb-3">
          <img src={previewImage} alt="Profile Preview" className="rounded-circle" style={{ width: "100px", height: "100px" }} />
        </div>

        {/* Edit Profile Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" name="name" value={user.name} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Bio</label>
            <textarea className="form-control" name="bio" value={user.bio} onChange={handleChange} rows="2" required></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input type="number" className="form-control" name="phone" value={user.phone} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input type="text" className="form-control" name="location" value={user.location} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
