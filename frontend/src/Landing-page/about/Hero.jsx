import React from "react";
import "./Hero.css";

const CompanyHero = () => {
  return (
    <section className="company-hero">
      <div className="container">
        <div className="company-hero-content">

          <div className="hero-badge">
            <span className="badge-icon">🚀</span>
            <span>About Stock Pilot</span>
          </div>

          <h1 className="company-hero-title">
            Pioneering the Future of
            <span className="gradient-text"> Financial Education</span>
          </h1>

          <p className="company-hero-desc">
            Stock Pilot is a modern fintech simulator that brings professional
            trading tools and real-time market data to the palm of your hand.
            We're on a mission to democratize market education through
            high-fidelity simulation and data-driven learning.
          </p>

          <div className="company-stats">
            <div className="stat-box">
              <h3>2026</h3>
              <p>Founded</p>
            </div>
            <div className="stat-box">
              <h3>5K+</h3>
              <p>Active Users</p>
            </div>
            <div className="stat-box">
              <h3>24/7</h3>
              <p>Platform Uptime</p>
            </div>
            <div className="stat-box">
              <h3>₹0</h3>
              <p>Setup Cost</p>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="hero-decoration decoration-1"></div>
      <div className="hero-decoration decoration-2"></div>
      <div className="hero-grid"></div>
    </section>
  );
};

export default CompanyHero;