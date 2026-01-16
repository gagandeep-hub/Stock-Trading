import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const SupportHero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Add search functionality here
  };

  return (
    <section className="support-hero-section">
      <div className="container">

        {/* Support Header */}
        <div className="support-header">
          <div className="support-badge">
            <span className="badge-icon">💬</span>
            <span>Learning Assistance</span>
          </div>

          <h1 className="support-title">How can we help you learn?</h1>

          <p className="support-desc">
            Search for simulator guides or browse help topics to find solutions quickly
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search for simulator help... (e.g., how to reset virtual cash)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-btn">
                Search
              </button>
            </div>
          </form>

          {/* Quick Links */}
          <div className="quick-links">
            <Link to="/support" className="quick-link">
              <span className="link-icon">📋</span>
              <span>Simulator Guide</span>
            </Link>
            <Link to="/support" className="quick-link">
              <span className="link-icon">🔓</span>
              <span>Account Setup</span>
            </Link>
            <Link to="/support" className="quick-link">
              <span className="link-icon">⚡</span>
              <span>Virtual Orders</span>
            </Link>
            <Link to="/support" className="quick-link">
              <span className="link-icon">📊</span>
              <span>Strategy Help</span>
            </Link>
          </div>
        </div>

        {/* Popular Topics Grid */}
        <div className="topics-grid">

          {/* Getting Started */}
          <div className="topic-card">
            <div className="topic-icon">🚀</div>
            <h3 className="topic-title">Getting Started</h3>
            <ul className="topic-links">
              <li>
                <Link to="/support">How to create an account</Link>
              </li>
              <li>
                <Link to="/support">Account verification process</Link>
              </li>
              <li>
                <Link to="/support">Adding funds to account</Link>
              </li>
              <li>
                <Link to="/support">Platform user manual</Link>
              </li>
            </ul>
          </div>

          {/* Trading */}
          <div className="topic-card">
            <div className="topic-icon">📈</div>
            <h3 className="topic-title">Trading</h3>
            <ul className="topic-links">
              <li>
                <Link to="/support">How to place orders</Link>
              </li>
              <li>
                <Link to="/support">Understanding order types</Link>
              </li>
              <li>
                <Link to="/support">Intraday vs delivery</Link>
              </li>
              <li>
                <Link to="/support">F&O activation guide</Link>
              </li>
            </ul>
          </div>

          {/* Account & Funds */}
          <div className="topic-card">
            <div className="topic-icon">💰</div>
            <h3 className="topic-title">Account & Funds</h3>
            <ul className="topic-links">
              <li>
                <Link to="/support">Fund withdrawal process</Link>
              </li>
              <li>
                <Link to="/support">Account statements</Link>
              </li>
              <li>
                <Link to="/support">Tax documents</Link>
              </li>
              <li>
                <Link to="/support">Update profile details</Link>
              </li>
            </ul>
          </div>

          {/* Technical Issues */}
          <div className="topic-card">
            <div className="topic-icon">🔧</div>
            <h3 className="topic-title">Technical Support</h3>
            <ul className="topic-links">
              <li>
                <Link to="/support">Login issues</Link>
              </li>
              <li>
                <Link to="/support">Platform not loading</Link>
              </li>
              <li>
                <Link to="/support">Browser compatibility</Link>
              </li>
              <li>
                <Link to="/support">Report a bug</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Featured Updates */}
        <div className="featured-section">
          <div className="featured-header">
            <h3 className="featured-title">
              <span className="title-icon">⭐</span>
              Featured Updates
            </h3>
          </div>

          <div className="featured-list">
            <div className="featured-item">
              <span className="item-badge">New</span>
              <Link to="/support" className="featured-link">
                Latest Platform Updates - January 2026
              </Link>
            </div>
            <div className="featured-item">
              <span className="item-badge update">Update</span>
              <Link to="/support" className="featured-link">
                Current Intraday Leverages - MIS & CO
              </Link>
            </div>
            <div className="featured-item">
              <span className="item-badge">Info</span>
              <Link to="/support" className="featured-link">
                Trading Holiday Calendar 2026
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SupportHero;