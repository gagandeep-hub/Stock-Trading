import React from 'react';
import './Hero.css';

const PricingHero = () => {
  return (
    <section className="pricing-hero-section">
      <div className="container">

        {/* Hero Header */}
        <div className="pricing-hero-header">
          <div className="hero-badge">
            <span className="badge-icon">💰</span>
            <span>Always Free Practice</span>
          </div>

          <h1 className="pricing-hero-title">
            Master Trading with Zero <span className="gradient-text">Cost</span>
          </h1>

          <p className="pricing-hero-desc">
            Practice with virtual capital and live market data.
            No real money involved, no hidden charges, and no risk.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-cards-grid">

          {/* Card 1 - Virtual Account */}
          <div className="pricing-feature-card">
            

            <div className="card-badge free">₹0</div>

            <h3 className="card-title">Free Practice Account</h3>

            <p className="card-description">
              Get ₹10,000 virtual cash to start your trading journey.
              Perfect for beginners and strategy testers.
            </p>

            <div className="card-features">
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>₹10k Virtual Capital</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>Real-time LTP Feed</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>No time limits</span>
              </div>
            </div>
          </div>

          {/* Card 2 - Pro Features */}
          <div className="pricing-feature-card highlighted">
            <div className="popular-badge">Learning Essential</div>
            <div className="card-badge popular">Free</div>

            <h3 className="card-title">Advanced Simulator</h3>

            <p className="card-description">
              Access advanced order types and portfolio analytics to
              deepen your understanding of market mechanics.
            </p>

            <div className="card-features">
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>Limit & Market Orders</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>Detailed P&L Reports</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>Strategy Backtesting</span>
              </div>
            </div>
          </div>

          {/* Card 3 - Edu Access */}
          <div className="pricing-feature-card">

            <div className="card-badge free">Free</div>

            <h3 className="card-title">Educational Access</h3>

            <p className="card-description">
              Full access to our "Simulation Academy" and community
              discussions to learn from other traders.
            </p>

            <div className="card-features">
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>Learning modules</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>Community guides</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>Expert webinars</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PricingHero;