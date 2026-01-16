import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-wrap">

        {/* LEFT CONTENT */}
        <div className="hero-text">
          <div className="hero-badge">
            <span className="badge-icon">📈</span>
            <span>Next-Gen Trading Platform</span>
          </div>

          <h1 className="hero-title">
            Master the Markets with
            <span className="gradient-text"> Risk-Free Trading</span>
          </h1>

          <p className="hero-description">
            Experience the thrill of the stock market without losing a single rupee.
            Stock Pilot provides ₹10,000 virtual cash and live market data to
            build your strategies and trade with total confidence.
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <h3>₹10k</h3>
              <p>Virtual Cash</p>
            </div>
            <div className="stat-item">
              <h3>₹0</h3>
              <p>Trading Risk</p>
            </div>
            <div className="stat-item">
              <h3>LIVE</h3>
              <p>Market Data</p>
            </div>
          </div>

          <div className="hero-cta">
            <Link to="/signup" className="primary-btn">
              Open Free Account
              <span className="btn-arrow">→</span>
            </Link>
            <Link to="/products" className="secondary-btn">
              <span className="play-icon">▶</span>
              Explore Platform
            </Link>
          </div>

          <div className="hero-trust">
            <p className="trust-text">
              <span className="trust-icon">🔒</span>
              Secure & Reliable • Built with Modern Technology
            </p>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <div className="floating-card card-1">
              <div className="card-header">
                <span className="status-dot green"></span>
                <span>Market Open</span>
              </div>
              <div className="card-value positive">+2.4%</div>
            </div>

            <div className="floating-card card-2">
              <div className="chart-mini">
                <div className="chart-bar" style={{ height: '60%' }}></div>
                <div className="chart-bar" style={{ height: '80%' }}></div>
                <div className="chart-bar" style={{ height: '45%' }}></div>
                <div className="chart-bar" style={{ height: '90%' }}></div>
                <div className="chart-bar" style={{ height: '70%' }}></div>
              </div>
            </div>

            <div className="floating-card card-3">
              <div className="ticker-item">
                <span className="ticker-name">NIFTY 50</span>
                <span className="ticker-price positive">+124.50</span>
              </div>
            </div>

            <img
              src="/assets/dashboard.png"
              alt="StockPilot dashboard preview"
              className="hero-main-image"
            />

            {/* Decorative elements */}
            <div className="hero-blur blur-1"></div>
            <div className="hero-blur blur-2"></div>
            <div className="grid-overlay"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;