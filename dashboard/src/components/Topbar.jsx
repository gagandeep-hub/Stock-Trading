import React, { useState, useEffect } from 'react'
import Menu from './Menu'

const Topbar = () => {
  // Simulated live market data with animations
  const [marketData, setMarketData] = useState({
    nifty: { value: 22456.80, change: 127.45, percent: 0.57, isUp: true },
    sensex: { value: 73648.62, change: 412.89, percent: 0.56, isUp: true },
    bankNifty: { value: 48234.15, change: -89.30, percent: -0.18, isUp: false }
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Live market updates - ALWAYS ON for practice mode
  useEffect(() => {
    const marketTimer = setInterval(() => {
      setMarketData(prev => ({
        nifty: {
          ...prev.nifty,
          value: prev.nifty.value + (Math.random() - 0.5) * 10,
          change: prev.nifty.change + (Math.random() - 0.5) * 2
        },
        sensex: {
          ...prev.sensex,
          value: prev.sensex.value + (Math.random() - 0.5) * 30,
          change: prev.sensex.change + (Math.random() - 0.5) * 5
        },
        bankNifty: {
          ...prev.bankNifty,
          value: prev.bankNifty.value + (Math.random() - 0.5) * 15,
          change: prev.bankNifty.change + (Math.random() - 0.5) * 3
        }
      }));
    }, 3000);

    return () => clearInterval(marketTimer);
  }, []);

  const formatNumber = (num) => {
    return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  return (
    <div className="sp-topbar">
      {/* Market Indices Section */}
      <div className="sp-indices">
        {/* NIFTY 50 */}
        <div className="sp-index-card">
          <div className="sp-index-header">
            <span className="sp-index-name">NIFTY 50</span>
            <span className={`sp-index-badge ${marketData.nifty.isUp ? 'up' : 'down'}`}>
              {marketData.nifty.isUp ? '▲' : '▼'}
            </span>
          </div>
          <div className="sp-index-value">{formatNumber(marketData.nifty.value)}</div>
          <div className={`sp-index-change ${marketData.nifty.isUp ? 'up' : 'down'}`}>
            {marketData.nifty.isUp ? '+' : ''}{formatNumber(marketData.nifty.change)}
            <span className="sp-index-percent">({marketData.nifty.percent.toFixed(2)}%)</span>
          </div>
        </div>

        {/* Divider */}
        <div className="sp-index-divider"></div>

        {/* SENSEX */}
        <div className="sp-index-card">
          <div className="sp-index-header">
            <span className="sp-index-name">SENSEX</span>
            <span className={`sp-index-badge ${marketData.sensex.isUp ? 'up' : 'down'}`}>
              {marketData.sensex.isUp ? '▲' : '▼'}
            </span>
          </div>
          <div className="sp-index-value">{formatNumber(marketData.sensex.value)}</div>
          <div className={`sp-index-change ${marketData.sensex.isUp ? 'up' : 'down'}`}>
            {marketData.sensex.isUp ? '+' : ''}{formatNumber(marketData.sensex.change)}
            <span className="sp-index-percent">({marketData.sensex.percent.toFixed(2)}%)</span>
          </div>
        </div>

        {/* Divider */}
        <div className="sp-index-divider"></div>

        {/* BANK NIFTY */}
        <div className="sp-index-card">
          <div className="sp-index-header">
            <span className="sp-index-name">BANK NIFTY</span>
            <span className={`sp-index-badge ${marketData.bankNifty.isUp ? 'up' : 'down'}`}>
              {marketData.bankNifty.isUp ? '▲' : '▼'}
            </span>
          </div>
          <div className="sp-index-value">{formatNumber(marketData.bankNifty.value)}</div>
          <div className={`sp-index-change ${marketData.bankNifty.isUp ? 'up' : 'down'}`}>
            {marketData.bankNifty.isUp ? '+' : ''}{formatNumber(marketData.bankNifty.change)}
            <span className="sp-index-percent">({marketData.bankNifty.percent.toFixed(2)}%)</span>
          </div>
        </div>

        {/* Time Display */}
        <div className="sp-market-info">
          <div className="sp-live-indicator">
            <span className="sp-live-dot"></span>
            <span>LIVE</span>
          </div>
          <div className="sp-time-display">
            <span className="sp-time">{formatTime(currentTime)}</span>
            <span className="sp-date">{formatDate(currentTime)}</span>
          </div>
        </div>
      </div>

      {/* Menu Component */}
      <Menu />
    </div>
  )
}

export default Topbar
