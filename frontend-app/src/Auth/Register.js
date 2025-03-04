import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../userContext";

const Register = () => {
  const { setUser } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setLoading(false);
      return setError("Passwords do not match");
    }

    try {
      const response = await fetch("http://localhost:4000/api/users/", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Registration failed!");
      }

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      console.log("Registration Successful:", json.message);
      console.log("User:", json.user?.name);

      setUser(json.user);
      navigate("/login");
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register my-5">
      <div className="brand h1 text-success text-center">Learnify</div>

      <div className="text-center mx-auto mt-5 p-3 w-50 shadow rounded ">
        <h3 className="text-success-emphasis">Register</h3>

        <form onSubmit={handleSubmit}>
          {/* name */}
          <div className="input-group mb-3 w-50 mt-3 mx-auto">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              aria-label="name"
              aria-describedby="basic-addon1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="input-group mb-3 w-50 mt-3 mx-auto">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              aria-label="email"
              aria-describedby="basic-addon1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="input-group mb-3 w-50 mt-3 mx-auto">
            <span className="input-group-text" id="basic-addon1">
              *
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              aria-label="password"
              aria-describedby="basic-addon1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div className="input-group mb-3 w-50 mt-3 mx-auto">
            <span className="input-group-text" id="basic-addon1">
              *
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              aria-label="password"
              aria-describedby="basic-addon1"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && <div className="alert alert-sm my-3">{error}</div>}

          <button
            className="btn bg-success-subtle"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering ..." : "Submit"}
          </button>

          <p className="mt-3">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
