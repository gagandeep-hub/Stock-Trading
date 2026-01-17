import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { email, password, username } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        "https://stockpilot-7nuo.onrender.com/auth/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          window.location.href = "https://stockpilot-dashboard-ce3n.onrender.com/";
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
      handleError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }

    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="signup-page">
      <div className="signup-container">

        {/* Left Side - Branding */}
        <div className="signup-left">
          {/* <Link to="/" className="brand-logo">
            <div className="logo-wrapper">
              <img src="/assets/logo (2).png" alt="StockPilot logo" />
            </div>
            <span className="brand-name">STOCKPILOT</span>
          </Link> */}

          <div className="left-content">
            <h1 className="welcome-title">
              Start Your Trading Journey Today
            </h1>
            <p className="welcome-desc">
              Join thousands of traders who trust StockPilot for their
              trading needs. Create your account and get started in minutes.
            </p>

            <div className="feature-points">
              <div className="feature-point">
                <span className="check-icon">✓</span>
                <span>₹0 Account Opening</span>
              </div>
              <div className="feature-point">
                <span className="check-icon">✓</span>
                <span>Quick Setup Process</span>
              </div>
              <div className="feature-point">
                <span className="check-icon">✓</span>
                <span>Secure & Reliable</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="signup-right">
          <div className="form-wrapper">

            <div className="form-header">
              <h2 className="form-title">Create Account</h2>
              <p className="form-subtitle">Get started with your free account</p>
            </div>

            <form onSubmit={handleSubmit} className="signup-form">

              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    placeholder="Choose a username"
                    onChange={handleOnChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={handleOnChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Create a password"
                    onChange={handleOnChange}
                    required
                    className="form-input"
                  />
                </div>
                <p className="input-hint">
                  Must be at least 6 characters long
                </p>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    <span>Create Account</span>
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </button>

              <div className="form-divider">
                <span>or</span>
              </div>

              <p className="login-link">
                Already have an account?{" "}
                <Link to="/login" className="link-highlight">
                  Sign In
                </Link>
              </p>

            </form>

            <p className="terms-text">
              By creating an account, you agree to our{" "}
              <Link to="/support" className="terms-link">Terms of Service</Link>{" "}
              and{" "}
              <Link to="/support" className="terms-link">Privacy Policy</Link>
            </p>

          </div>
        </div>

      </div>

      <ToastContainer />
    </div>
  );
};

export default Signup;