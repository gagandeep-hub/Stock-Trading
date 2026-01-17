import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = inputValue;

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
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        "https://stockpilot-7nuo.onrender.com/auth/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message, token } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          window.location.href = `https://stockpilot-dashboard-ce3n.onrender.com/?token=${token}`;
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
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* Left Side - Branding */}
        <div className="login-left">
          {/* <Link to="/" className="brand-logo">
            <div className="logo-wrapper">
              <img src="/assets/logo (2).png" alt="StockPilot logo" />
            </div>
            <span className="brand-name">STOCKPILOT</span>
          </Link> */}

          <div className="left-content">
            <h1 className="welcome-title">
              Welcome Back to StockPilot
            </h1>
            <p className="welcome-desc">
              Sign in to your account to access your portfolio, track your
              trades, and continue your trading journey.
            </p>

            <div className="feature-points">
              <div className="feature-point">
                <span className="check-icon">✓</span>
                <span>Secure Login</span>
              </div>
              <div className="feature-point">
                <span className="check-icon">✓</span>
                <span>Real-time Trading</span>
              </div>
              <div className="feature-point">
                <span className="check-icon">✓</span>
                <span>Portfolio Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="login-right">
          <div className="form-wrapper">

            <div className="form-header">
              <h2 className="form-title">Sign In</h2>
              <p className="form-subtitle">Welcome back! Please enter your details</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">

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
                <div className="label-row">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Link to="/support" className="forgot-link">
                    Forgot password?
                  </Link>
                </div>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={handleOnChange}
                    required
                    className="form-input"
                  />
                </div>
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
                    <span>Sign In</span>
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </button>

              <div className="form-divider">
                <span>or</span>
              </div>

              <p className="signup-link">
                Don't have an account?{" "}
                <Link to="/signup" className="link-highlight">
                  Create Account
                </Link>
              </p>

            </form>

          </div>
        </div>

      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;