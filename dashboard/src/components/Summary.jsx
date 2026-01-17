import React, { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from './context/AuthContext';
import { Link } from 'react-router-dom';

const Summary = () => {
  const { user } = useContext(AuthContext);
  const [wallet, setWallet] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch wallet balance
        const walletRes = await api.get("/wallet");
        setWallet(walletRes.data);

        // Fetch user holdings
        const holdingsRes = await api.get("/allHoldings");
        setHoldings(holdingsRes.data);
      } catch (err) {
        console.error("Error fetching summary data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Live price updates - ALWAYS ON for practice mode
  useEffect(() => {
    if (holdings.length === 0) return;

    const interval = setInterval(() => {
      setHoldings(prev => prev.map(h => {
        // Price simulation matching other components (~0.3% max fluctuation)
        const priceChange = (Math.random() - 0.5) * (h.price * 0.003);
        return {
          ...h,
          price: h.price + priceChange,
        };
      }));
    }, 2500);

    return () => clearInterval(interval);
  }, [holdings.length]);

  // Calculate holdings stats
  const holdingsStats = holdings.reduce((acc, h) => {
    const investment = h.avg * h.qty;
    const currentValue = h.price * h.qty;
    const pnl = currentValue - investment;

    return {
      totalInvestment: acc.totalInvestment + investment,
      currentValue: acc.currentValue + currentValue,
      totalPnl: acc.totalPnl + pnl,
    };
  }, { totalInvestment: 0, currentValue: 0, totalPnl: 0 });

  const pnlPercent = holdingsStats.totalInvestment > 0
    ? ((holdingsStats.totalPnl / holdingsStats.totalInvestment) * 100).toFixed(2)
    : 0;

  const formatPrice = (price) => {
    if (price >= 1000) {
      return `₹${(price / 1000).toFixed(2)}k`;
    }
    return `₹${price.toFixed(2)}`;
  };

  const formatFullPrice = (price) => {
    return `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  if (loading) {
    return (
      <div className="sp-summary">
        <div className="sp-summary-loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="sp-summary">
      {/* Welcome Section */}
      <div className="sp-welcome">
        <div className="sp-welcome-content">
          <span className="sp-greeting">Welcome back,</span>
          <h2 className="sp-user-name">{user || 'Trader'}</h2>
        </div>
        <div className="sp-welcome-decoration">
          <svg viewBox="0 0 120 40" fill="none">
            <path d="M0 35 Q30 5, 60 25 T120 15" stroke="url(#sparkline)" strokeWidth="2" fill="none" />
            <defs>
              <linearGradient id="sparkline" x1="0" y1="0" x2="120" y2="0">
                <stop stopColor="#10b981" />
                <stop offset="1" stopColor="#00d4ff" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="sp-summary-divider" />

      {/* Equity Section - Wallet Balance */}
      <div className="sp-section">
        <div className="sp-section-header">
          <div className="sp-section-icon equity">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
          </div>
          <span className="sp-section-title">Equity</span>
        </div>

        <div className="sp-section-content">
          <div className="sp-stat-primary">
            <span className="sp-stat-value">{formatPrice(wallet?.balance || 0)}</span>
            <span className="sp-stat-label">Available Balance</span>
          </div>

          <div className="sp-stat-divider" />

          <div className="sp-stat-secondary">
            <div className="sp-stat-row">
              <span className="sp-stat-key">Invested</span>
              <span className="sp-stat-val">{formatPrice(holdingsStats.totalInvestment)}</span>
            </div>
            <div className="sp-stat-row">
              <span className="sp-stat-key">Initial Bonus</span>
              <span className="sp-stat-val">₹10,000</span>
            </div>
          </div>
        </div>
      </div>

      <div className="sp-summary-divider" />

      {/* Holdings Section */}
      <div className="sp-section">
        <div className="sp-section-header">
          <div className="sp-section-icon holdings">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
          </div>
          <span className="sp-section-title">Holdings</span>
          <span className="sp-section-badge">{holdings.length}</span>
        </div>

        <div className="sp-section-content">
          <div className={`sp-stat-primary ${holdingsStats.totalPnl >= 0 ? 'profit' : 'loss'}`}>
            <span className="sp-stat-value">
              {holdingsStats.totalPnl >= 0 ? '+' : ''}{formatPrice(holdingsStats.totalPnl)}
              <span className={`sp-stat-percent ${holdingsStats.totalPnl >= 0 ? 'up' : 'down'}`}>
                {holdingsStats.totalPnl >= 0 ? '+' : ''}{pnlPercent}%
              </span>
            </span>
            <span className="sp-stat-label">Total P&L</span>
          </div>

          <div className="sp-stat-divider" />

          <div className="sp-stat-secondary">
            <div className="sp-stat-row">
              <span className="sp-stat-key">Current Value</span>
              <span className="sp-stat-val">{formatPrice(holdingsStats.currentValue)}</span>
            </div>
            <div className="sp-stat-row">
              <span className="sp-stat-key">Investment</span>
              <span className="sp-stat-val">{formatPrice(holdingsStats.totalInvestment)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="sp-summary-divider" />

      {/* Quick Actions */}
      <div className="sp-quick-actions">
        <Link to="/funds" className="sp-action-btn add-funds">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8M8 12h8" />
          </svg>
          <span>Add Funds</span>
        </Link>
        <Link to="/funds" className="sp-action-btn withdraw">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          <span>Withdraw</span>
        </Link>
      </div>
    </div>
  )
}

export default Summary
