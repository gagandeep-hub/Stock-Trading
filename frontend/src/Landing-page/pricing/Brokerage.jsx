import React from 'react';
import { Link } from 'react-router-dom';
import './Brokerage.css';

const Brokerage = () => {
  return (
    <section className="brokerage-section">
      <div className="container">

        <div className="row align-items-start">

          {/* Left - Calculator Card */}
          <div className="col-lg-8 col-md-12">
            <div className="brokerage-card">

              <div className="card-header-section">
                <div className="header-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div className="header-content">
                  <h3 className="card-title">Simulator Value Guide</h3>
                  <p className="card-subtitle">Why practice with Stock Pilot?</p>
                </div>
              </div>

              <div className="charges-list">
                <h4 className="list-title">Trading Simulation Benefits</h4>

                <div className="charge-item">
                  <span className="item-icon">🛡️</span>
                  <div className="item-content">
                    <p><strong>Zero Capital Risk:</strong> Trade the most volatile stocks without the fear of losing your hard-earned savings.</p>
                  </div>
                </div>

                <div className="charge-item">
                  <span className="item-icon">📊</span>
                  <div className="item-content">
                    <p><strong>Live Market Feed:</strong> Experience the real-time movement of indices and stocks just like the actual market.</p>
                  </div>
                </div>

                <div className="charge-item">
                  <span className="item-icon">🧪</span>
                  <div className="item-content">
                    <p><strong>Strategy Testing:</strong> Perfect your technical setups and "Price Action" theories before going live.</p>
                  </div>
                </div>

                <div className="charge-item">
                  <span className="item-icon">⚡</span>
                  <div className="item-content">
                    <p><strong>Instant Execution:</strong> Learn how orders are filled and managed in a high-speed trading environment.</p>
                  </div>
                </div>

                <div className="charge-item">
                  <span className="item-icon">🎓</span>
                  <div className="item-content">
                    <p><strong>Learning Curve:</strong> Reduce your learning time by making "expensive mistakes" for free in our simulator.</p>
                  </div>
                </div>

                <div className="charge-item warning">
                  <span className="item-icon">⚠️</span>
                  <div className="item-content">
                    <p>While the simulation is realistic, it is intended for <strong>educational purposes only</strong>. Real market execution may vary.</p>
                  </div>
                </div>
              </div>

              <Link to="/signup" className="calculator-btn">
                <span>Start Practicing Now</span>
                <span className="btn-arrow">→</span>
              </Link>

            </div>
          </div>

          {/* Right - Quick Links Card */}
          <div className="col-lg-4 col-md-12">
            <div className="quick-links-card">

              <div className="links-header">
                <div className="header-icon-small">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h3 className="links-title">Resources</h3>
              </div>

              <div className="links-list">
                <Link to="/pricing" className="link-item">
                  <span className="link-text">Complete List of Charges</span>
                  <span className="link-arrow">→</span>
                </Link>

                <Link to="/pricing" className="link-item">
                  <span className="link-text">Charges Explained</span>
                  <span className="link-arrow">→</span>
                </Link>

                <Link to="/support" className="link-item">
                  <span className="link-text">Tax Documentation</span>
                  <span className="link-arrow">→</span>
                </Link>

                <Link to="/support" className="link-item">
                  <span className="link-text">Help & Support</span>
                  <span className="link-arrow">→</span>
                </Link>
              </div>

              <div className="help-note">
                <div className="note-icon">💡</div>
                <p>Need help understanding charges? Our support team is here to assist you.</p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Brokerage;