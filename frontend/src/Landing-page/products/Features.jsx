import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <section className="features-section" id="features">
      <div className="container">

        {/* Section Header */}
        <div className="features-header">
          <div className="section-badge">
            <span>Platform Features</span>
          </div>
          <h2 className="features-title">Everything You Need to Master Trading</h2>
          <p className="features-desc">
            Advanced simulator features designed to provide a realistic
            trading experience with absolutely zero financial risk.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid">

          {/* Feature 1 - Virtual Dashboard */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon">🎮</div>
            </div>
            <h3 className="feature-title">Practice Dashboard</h3>
            <p className="feature-description">
              Intuitive dashboard with real-time market simulation, ₹10,000 virtual
              cash, and complete portfolio overview at a glance.
            </p>
            <ul className="feature-list">
              <li>Live price simulation</li>
              <li>Risk-free order placement</li>
              <li>Virtual capital management</li>
            </ul>
            <div className="feature-status coming-soon">Live</div>
          </div>

          {/* Feature 2 - Simulated Holdings */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon">💼</div>
            </div>
            <h3 className="feature-title">Virtual Portfolio</h3>
            <p className="feature-description">
              Track your simulated investments in one place. Monitor performance,
              analyze P&L, and manage your virtual holdings easily.
            </p>
            <ul className="feature-list">
              <li>LTP tracking 24/7</li>
              <li>Realistic P&L metrics</li>
              <li>Strategy performance logs</li>
            </ul>
            <div className="feature-status coming-soon">Live</div>
          </div>

          {/* Feature 3 - Order Simulator */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon">📋</div>
            </div>
            <h3 className="feature-title">Order Simulator</h3>
            <p className="feature-description">
              Complete order history for your practice trades. Track pending
              buy/sell orders and manage your execution history.
            </p>
            <ul className="feature-list">
              <li>Simulated order history</li>
              <li>Limit & Market types</li>
              <li>Instant virtual execution</li>
            </ul>
            <div className="feature-status coming-soon">Live</div>
          </div>

          {/* Feature 4 - Watchlist */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon">⭐</div>
            </div>
            <h3 className="feature-title">Market Watchlist</h3>
            <p className="feature-description">
              Create custom watchlists to track stocks you're studying.
              Get quick access and stay updated on simulated price movements.
            </p>
            <ul className="feature-list">
              <li>Custom watchlists</li>
              <li>Quick action buttons</li>
              <li>Live price indicators</li>
            </ul>
            <div className="feature-status coming-soon">Live</div>
          </div>

          {/* Feature 5 - Analytics */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon">📈</div>
            </div>
            <h3 className="feature-title">Strategy Analytics</h3>
            <p className="feature-description">
              Access simulated market charts and technical tools to test
              your trading strategies before going to the real market.
            </p>
            <ul className="feature-list">
              <li>TradingView charts</li>
              <li>Strategy backtesting</li>
              <li>Execution analysis</li>
            </ul>
            <div className="feature-status planned">Planned</div>
          </div>

          {/* Feature 6 - Insights */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon">📊</div>
            </div>
            <h3 className="feature-title">Learning Insights</h3>
            <p className="feature-description">
              Detailed reports to help you understand your trading errors
              and improve your psychological approach to the markets.
            </p>
            <ul className="feature-list">
              <li>Error detection</li>
              <li>Win-rate analysis</li>
              <li>Risk management tips</li>
            </ul>
            <div className="feature-status planned">Planned</div>
          </div>

        </div>

        {/* Tech Stack Section */}
        <div className="tech-stack-section">
          <h3 className="tech-stack-title">Built with Modern Technology</h3>
          <p className="tech-stack-desc">
            Stock Pilot is built using cutting-edge web technologies to ensure
            fast performance, reliability, and high-fidelity simulation.
          </p>
          <div className="tech-badges">
            <div className="tech-badge">
              <span className="tech-icon">⚛️</span>
              <span>React.js</span>
            </div>
            <div className="tech-badge">
              <span className="tech-icon">🟢</span>
              <span>Node.js</span>
            </div>
            <div className="tech-badge">
              <span className="tech-icon">🍃</span>
              <span>MongoDB</span>
            </div>
            <div className="tech-badge">
              <span className="tech-icon">⚡</span>
              <span>Express.js</span>
            </div>
            <div className="tech-badge">
              <span className="tech-icon">🎨</span>
              <span>Bootstrap</span>
            </div>
            <div className="tech-badge">
              <span className="tech-icon">🔌</span>
              <span>REST APIs</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;