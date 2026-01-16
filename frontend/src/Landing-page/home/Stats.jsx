import React from "react";
import { Link } from "react-router-dom";
import "./Stats.css";

const Stats = () => {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="row align-items-center">

          {/* LEFT CONTENT */}
          <div className="col-lg-6 col-sm-12 stats-content">
            <div className="section-badge">
              <span>Our Values</span>
            </div>

            <h2>Built on Trust and Transparency</h2>

            <div className="stats-items">
              <div className="stats-item">
                <div className="item-icon">🚀</div>
                <div className="item-content">
                  <h4>Risk-Free Simulation</h4>
                  <p>
                    Test your trading hypotheses without any financial risk.
                    Practice with ₹10,000 virtual cash and perfect your strategy.
                  </p>
                </div>
              </div>

              <div className="stats-item">
                <div className="item-icon">📊</div>
                <div className="item-content">
                  <h4>Live Market Data</h4>
                  <p>
                    Get the same real-time data as professional traders.
                    Our simulator mimics the actual live market movements accurately.
                  </p>
                </div>
              </div>

              <div className="stats-item">
                <div className="item-icon">💡</div>
                <div className="item-content">
                  <h4>Strategy Testing</h4>
                  <p>
                    Try advanced tools and indicators on our platform.
                    Analyze your trades and learn from your hits and misses.
                  </p>
                </div>
              </div>

              <div className="stats-item">
                <div className="item-icon">🎓</div>
                <div className="item-content">
                  <h4>Learning First</h4>
                  <p>
                    We prioritize education. Our platform is designed to help
                    you understand how the stock market works, step by step.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="col-lg-6 col-sm-12 stats-visual">
            <div className="visual-wrapper">
              <img src="/assets/stats.png" alt="StockPilot platform ecosystem" />
            </div>

            <div className="stats-links">
              <Link to="/products" className="stats-link">
                <span>Explore Platform Features</span>
                <span className="link-arrow">→</span>
              </Link>
              <Link to="/products" className="stats-link">
                <span>See How It Works</span>
                <span className="link-arrow">→</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Stats;