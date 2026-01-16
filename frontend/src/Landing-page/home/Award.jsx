import React from "react";
import "./Award.css";

const Award = () => {
  return (
    <section className="award-section">
      <div className="container">
        <div className="row align-items-center">

          {/* LEFT VISUAL */}
          <div className="col-lg-6 col-sm-12 award-image">
            <div className="image-wrapper">
              <img src="/assets/Dashboard-preview (2).png" alt="StockPilot platform overview" />
              <div className="image-badge">
                <span className="badge-dot"></span>
                <span>Live Platform</span>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-lg-6 col-sm-12 award-content">
            <div className="section-badge">
              <span>Why StockPilot</span>
            </div>

            <h2>Built for Modern Traders</h2>

            <p className="award-desc">
              Stock Pilot is designed to help you trade with clarity and
              confidence. Our simulation platform brings you closer to the
              market without the financial risk involved.
            </p>

            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">🎮</div>
                <div className="feature-text">
                  <h4>Virtual Trading</h4>
                  <p>₹10,000 practice capital</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">📈</div>
                <div className="feature-text">
                  <h4>Portfolio Tracking</h4>
                  <p>Real-time P&L monitoring</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">📡</div>
                <div className="feature-text">
                  <h4>Live Market Feed</h4>
                  <p>Real-time price simulations</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">🛡️</div>
                <div className="feature-text">
                  <h4>Safe Learning</h4>
                  <p>Zero financial risk always</p>
                </div>
              </div>
            </div>

            <div className="award-footnote">
              <span className="footnote-icon">✓</span>
              Trusted platform with intuitive design
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Award;