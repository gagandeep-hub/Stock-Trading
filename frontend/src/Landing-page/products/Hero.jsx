import React from 'react';
import './Hero.css';

const ProductsHero = () => {
  return (
    <section className="products-hero-section">
      <div className="container">

        {/* Hero Header */}
        <div className="products-hero-header">
          <div className="hero-badge">
            <span className="badge-icon">🚀</span>
            <span>Stock Pilot Simulator</span>
          </div>

          <h1 className="products-hero-title">
            The Ultimate Trading Simulator,
            <span className="gradient-text"> Built for Mastery</span>
          </h1>

          <p className="products-hero-desc">
            Experience the thrill of the market with zero financial risk.
            Our advanced simulator provides real-time market data, virtual capital,
            and professional tools to help you master the art of trading.
          </p>

          <div className="hero-cta-buttons">
            <a href="/signup" className="primary-cta">
              <span>Start Trading Now</span>
              <span className="btn-arrow">→</span>
            </a>
            <a href="#features" className="secondary-cta">
              <span className="play-icon">▶</span>
              <span>Explore Features</span>
            </a>
          </div>
        </div>

        {/* Platform Preview */}
        <div className="platform-preview">
          <div className="preview-wrapper">
            <img
              src="/assets/Dashboard-preview (2).png"
              alt="StockPilot platform preview"
              className="preview-image"
            />
            <div className="preview-overlay"></div>
          </div>

          {/* Floating Stats */}
          <div className="floating-stat stat-1">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <h4>Real-time</h4>
              <p>Market Data</p>
            </div>
          </div>

          <div className="floating-stat stat-2">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h4>3000+</h4>
              <p>Stocks Listed</p>
            </div>
          </div>

          <div className="floating-stat stat-3">
            <div className="stat-icon">✓</div>
            <div className="stat-content">
              <h4>Instant</h4>
              <p>Order Execution</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductsHero;