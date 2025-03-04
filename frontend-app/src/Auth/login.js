import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../userContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Prevent multiple clicks

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Login failed");
      }

      // Reset form on success
      setEmail("");
      setPassword("");

      console.log("Login Success:", json.message);
      console.log("User Data:", json.user);

      setUser(json.user);
      navigate("/"); // Navigate only after user is set
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.message);
    } finally {
      setLoading(false); // Re-enable button
    }
  };

  return (
    <div className="login my-5">
      <div className="brand h1 text-success text-center">Learnify</div>

      <div className="text-center mx-auto mt-5 p-3 w-50 shadow rounded">
        <h3 className="text-success-emphasis">Login</h3>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="input-group mb-3 w-50 mt-3 mx-auto">
            <span className="input-group-text">@</span>
            <input
              type="text" // Changed to "email" for better validation
              className="form-control"
              placeholder="Email"
              aria-label="Email"
              required // Ensures the field is not empty
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="input-group mb-3 w-50 mt-3 mx-auto">
            <span className="input-group-text">*</span>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              aria-label="Password"
              required // Ensures the field is not empty
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && <div className="alert alert-danger w-50 mx-auto">{error}</div>}

          {/* Submit Button */}
          <button
            className="btn bg-success-subtle"
            type="submit"
            disabled={loading} // Prevents multiple submissions
          >
            {loading ? "Logging in..." : "Submit"} {/* Loading Indicator */}
          </button>

          {/* Registration Link */}
          <p className="mt-3">
            No account with us yet? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
