import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      },  { withCredentials: true });

    
      // تحديث الحالة لتسجيل الدخول
      setIsLoggedIn(true); // تحديث حالة المستخدم في App.js

      navigate("/"); // توجيه بعد الدخول
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="login-box border p-4 rounded">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-login w-100 mb-3">
            Login
          </button>
          <p className="text-center">
            Don’t have an account?{" "}
            <a href="/register" className="register-link">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
