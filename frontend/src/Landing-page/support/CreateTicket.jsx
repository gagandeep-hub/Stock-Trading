import React from 'react';
import { Link } from 'react-router-dom';
import './CreateTicket.css';

const CreateTicket = () => {
  const categories = [
    {
      icon: '🎮',
      title: 'Simulator Basics',
      links: [
        'Getting Started Guide',
        'Virtual Cash Overview',
        'How to Reset Portfolio',
        'Platform Walkthrough',
        'Market Hours Practice',
        'System Requirements'
      ]
    },
    {
      icon: '📊',
      title: 'Virtual Trading',
      links: [
        'How to Place Orders',
        'Order Types Explained',
        'Limit vs Market Orders',
        'Simulated Execution',
        'Order History Guide',
        'Stop Loss Practice'
      ]
    },
    {
      icon: '💰',
      title: 'Virtual Funds',
      links: [
        'Initial ₹10k Capital',
        'Balance Breakdown',
        'Unrealized P&L Info',
        'Realized P&L Info',
        'Wallet Simulation',
        'Fund Reset Process'
      ]
    },
    {
      icon: '📈',
      title: 'Strategy & Analysis',
      links: [
        'Using Charts',
        'Technical Indicators',
        'Strategy Backtesting',
        'Risk Management Tips',
        'Portfolio Performance',
        'Learning Resources'
      ]
    },
    {
      icon: '⚡',
      title: 'Simulator Issues',
      links: [
        'Login Problems',
        'Price Delay Issues',
        'Execution Errors',
        'Dashboard Refresh',
        'Browser Compatibility',
        'Mobile View Support'
      ]
    },
    {
      icon: '🎓',
      title: 'Learning Path',
      links: [
        'Trading for Beginners',
        'Mastering Price Action',
        'Options Simulation',
        'Psychology of Trading',
        'Common Mistake Logs',
        'Contact Mentor Team'
      ]
    }
  ];

  return (
    <section className="create-ticket-section">
      <div className="container">

        <div className="section-header">
          <h2 className="section-title">Select a Category to Create Ticket</h2>
          <p className="section-desc">
            Choose the category that best matches your issue to get faster support
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <div className="category-header">
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-title">{category.title}</h3>
              </div>

              <ul className="category-links">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link to="/support" className="category-link">
                      <span className="link-dot">•</span>
                      <span>{link}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <Link to="/support" className="view-all-link">
                View All Topics
                <span className="arrow">→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Contact Support CTA */}
        <div className="support-cta">
          <div className="cta-content">
            <h3 className="cta-title">Can't find what you're looking for?</h3>
            <p className="cta-desc">
              Our support team is here to help you 24/7
            </p>
          </div>
          <Link to="/support" className="cta-button">
            Contact Support
            <span className="btn-arrow">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default CreateTicket;