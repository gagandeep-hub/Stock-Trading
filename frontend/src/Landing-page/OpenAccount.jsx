import React from "react";
import { Link } from "react-router-dom";
import "./OpenAccount.css";

const OpenAccount = () => {
  return (
    <section className="open-account-section">
      <div className="container">
        <div className="cta-wrapper">
          
          <div className="cta-badge">
            <span className="badge-pulse"></span>
            <span>Get Started Today</span>
          </div>

          <h2 className="cta-heading">
            Ready to Start Your Trading Journey?
          </h2>

          <p className="cta-description">
            Join thousands of traders who trust StockPilot. 
            Open your account in minutes and start trading with confidence.
          </p>

          <div className="cta-buttons">
            <Link to="/signup" className="primary-cta-btn">
              <span>Open Free Account</span>
              <span className="btn-arrow">→</span>
            </Link>
            <Link to="/products" className="secondary-cta-btn">
              <span>Explore Platform</span>
            </Link>
          </div>

          <div className="cta-features">
            <div className="feature-badge">
              <span className="check-icon">✓</span>
              <span>₹0 Account Opening</span>
            </div>
            <div className="feature-badge">
              <span className="check-icon">✓</span>
              <span>Quick Setup</span>
            </div>
            <div className="feature-badge">
              <span className="check-icon">✓</span>
              <span>24/7 Support</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OpenAccount;

