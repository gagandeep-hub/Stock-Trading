import React from 'react';
import './Team.css';
import portfolio from "/assets/gd.png";
const Team = () => {
  return (
    <section className="team-section">
      <div className="container">

        {/* Section Header */}
        <div className="team-header">
          <div className="section-badge">
            <span>Meet The Team</span>
          </div>
          <h2 className="team-title">Built by Developers, for Traders</h2>
          <p className="team-desc">
            Stock Pilot is a passion project created to explore modern web development
            and real-world trading system architecture.
          </p>
        </div>

        {/* Team Member */}
        <div className="team-member">
          <div className="row align-items-center">

            {/* Left - Image */}
            <div className="col-lg-5 col-md-12 team-image-col">
              <div className="team-image-wrapper">
                <div className="image-frame">
                  <img
                    src="/assets/gd.png"
                    alt="Developer"
                    className="team-image"
                  />
                  <div className="image-decoration"></div>
                </div>

                <div className="developer-badge">
                  <span className="badge-code">{'</>  '}</span>
                  <span>Full Stack Developer</span>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="col-lg-7 col-md-12 team-content-col">
              <div className="team-content">

                <div className="name-section">
                  <h3 className="member-name">Gagandeep Kushwah</h3>
                  <span className="member-role">Founder & Developer</span>
                </div>

                <div className="bio-section">
                  <p className="bio-text">
                    Built Stock Pilot as a full-stack project to learn and demonstrate
                    modern web development practices. The platform showcases real-world
                    trading workflows, system architecture, and user experience design.
                  </p>

                  <p className="bio-text">
                    Passionate about building scalable applications and exploring fintech
                    solutions. Stock Pilot combines frontend excellence with robust backend
                    architecture to create a seamless trading experience.
                  </p>
                </div>

                <div className="tech-stack">
                  <h4 className="tech-title">Tech Stack Used</h4>
                  <div className="tech-badges">
                    <span className="tech-badge">React.js</span>
                    <span className="tech-badge">Node.js</span>
                    <span className="tech-badge">MongoDB</span>
                    <span className="tech-badge">Express.js</span>
                    <span className="tech-badge">REST APIs</span>
                    <span className="tech-badge">Bootstrap</span>
                  </div>
                </div>

                <div className="social-links">
                  <h4 className="social-title">Connect With Me</h4>
                  <div className="social-buttons">
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path>
                      </svg>
                      <span>GitHub</span>
                    </a>

                    <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="social-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                      </svg>
                      <span>LinkedIn</span>
                    </a>

                    <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="social-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                      <span>Twitter</span>
                    </a>

                    <a href="https://gagandeepdev.xyz" target="_blank" rel="noopener noreferrer" className="social-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="https://gagandeepdev.xyz"></path>
                      </svg>
                      <span>Portfolio</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Project Note */}
        <div className="project-note">
          <div className="note-icon">💡</div>
          <div className="note-content">
            <h4>About This Project</h4>
            <p>
              Stock Pilot is a learning-focused project that demonstrates full-stack
              development capabilities, trading system architecture, and modern UI/UX design.
              It serves as a portfolio piece showcasing technical skills and problem-solving abilities.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Team;