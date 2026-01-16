import React from "react";
import { Link } from "react-router-dom";
import "./Education.css";

const Education = () => {
  return (
    <section className="education-section">
      <div className="container">
        <div className="row align-items-center">

          {/* LEFT IMAGE */}
          <div className="col-lg-6 col-sm-12 education-image">
            <div className="image-container">
              <img
                src="/assets/education.svg"
                alt="Market education and learning"
              />
              <div className="floating-badge">
                <span className="badge-icon">📚</span>
                <span>Learn & Grow</span>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-lg-6 col-sm-12 education-content">
            <div className="section-badge">
              <span>Learn Trading</span>
            </div>

            <h2>Free and Open Market Education</h2>

            <p className="education-intro">
              Master the art of trading through our high-fidelity simulator.
              Learn strategies, analyze market trends, and practice without risk.
            </p>

            <div className="education-links">

              <div className="education-card">
                <div className="card-icon">📖</div>
                <div className="card-content">
                  <h4>Simulation Academy</h4>
                  <p>Learn how to use virtual capital to test complex trading strategies</p>
                  <Link to="/products" className="card-link">
                    <span>Start Learning</span>
                    <span className="link-arrow">→</span>
                  </Link>
                </div>
              </div>

              <div className="education-card">
                <div className="card-icon">💬</div>
                <div className="card-content">
                  <h4>Community Discussions</h4>
                  <p>Join traders to share ideas, ask questions, and learn from experiences</p>
                  <Link to="/support" className="card-link">
                    <span>Join Community</span>
                    <span className="link-arrow">→</span>
                  </Link>
                </div>
              </div>

            </div>

            <div className="education-note">
              <span className="note-icon">💡</span>
              <span>All learning resources are completely free for all users</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Education;