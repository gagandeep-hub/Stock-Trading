import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Helper function to check if market is open
const isMarketOpen = () => {
  const now = new Date();
  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 60 + minutes;
  const marketOpen = 9 * 60; // 9:00 AM
  const marketClose = 16 * 60; // 4:00 PM

  if (day === 0 || day === 6) return false;
  return currentTime >= marketOpen && currentTime < marketClose;
};

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [marketOpen, setMarketOpen] = useState(isMarketOpen());

  // Fetch positions from API
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await axios.get("http://localhost:3002/allPositions", {
          withCredentials: true,
        });
        // Add live price tracking
        const positionsWithLivePrices = res.data.map(position => ({
          ...position,
          livePrice: position.price,
          dayChange: (Math.random() - 0.5) * 3,
        }));
        setAllPositions(positionsWithLivePrices);
      } catch (err) {
        setError("Failed to load positions");
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  // Check market status every minute
  useEffect(() => {
    const checkMarket = setInterval(() => {
      setMarketOpen(isMarketOpen());
    }, 60000);
    return () => clearInterval(checkMarket);
  }, []);

  // Live price updates - ALWAYS ON for practice mode
  useEffect(() => {
    if (allPositions.length === 0) return;

    const interval = setInterval(() => {
      setAllPositions(prev => prev.map(position => {
        const priceChange = (Math.random() - 0.5) * (position.livePrice * 0.003);
        const newPrice = position.livePrice + priceChange;
        const dayChangeUpdate = (priceChange / position.avg) * 100;

        return {
          ...position,
          livePrice: newPrice,
          dayChange: position.dayChange + dayChangeUpdate * 0.1,
        };
      }));
    }, 2500);

    return () => clearInterval(interval);
  }, [allPositions.length]);

  // Calculate totals
  const totals = allPositions.reduce((acc, position) => {
    const investment = position.avg * position.qty;
    const currentValue = position.livePrice * position.qty;
    const pnl = currentValue - investment;

    return {
      investment: acc.investment + investment,
      currentValue: acc.currentValue + currentValue,
      pnl: acc.pnl + pnl,
    };
  }, { investment: 0, currentValue: 0, pnl: 0 });

  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  if (loading) {
    return (
      <div className="sp-positions">
        <div className="sp-positions-loading">
          <div className="sp-loader"></div>
          <span>Loading positions...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sp-positions">
        <div className="sp-positions-error">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="sp-positions">
      {/* Header */}
      <div className="sp-positions-header">
        <div className="sp-positions-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 3v18h18" />
            <path d="M7 16l4-4 4 4 5-6" />
          </svg>
          <h2>Positions</h2>
          <span className="sp-positions-count">{allPositions.length}</span>
        </div>

      </div>

      {/* Positions Table */}
      {allPositions.length === 0 ? (
        <div className="sp-positions-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 3v18h18" />
            <path d="M7 16l4-4 4 4 5-6" />
          </svg>
          <h3>No open positions</h3>
          <p>Your intraday trades will appear here</p>
        </div>
      ) : (
        <>
          <div className="sp-positions-table-wrapper">
            <table className="sp-positions-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Stock</th>
                  <th>Qty</th>
                  <th>Avg Price</th>
                  <th>LTP</th>
                  <th>P&L</th>
                  <th>Day Chg</th>
                </tr>
              </thead>
              <tbody>
                {allPositions.map((position, index) => {
                  const investment = position.avg * position.qty;
                  const currentValue = position.livePrice * position.qty;
                  const pnl = currentValue - investment;
                  const pnlPercent = ((pnl / investment) * 100).toFixed(2);
                  const isProfit = pnl >= 0;

                  return (
                    <tr key={index}>
                      <td>
                        <span className="sp-position-product">{position.product || 'CNC'}</span>
                      </td>
                      <td>
                        <span className="sp-position-name">{position.name}</span>
                      </td>
                      <td className="sp-position-qty">{position.qty}</td>
                      <td className="sp-position-price">₹{formatPrice(position.avg)}</td>
                      <td className="sp-position-ltp">₹{formatPrice(position.livePrice)}</td>
                      <td>
                        <span className={`sp-position-pnl ${isProfit ? 'profit' : 'loss'}`}>
                          {isProfit ? '+' : ''}₹{formatPrice(pnl)}
                          <span className="sp-pnl-percent">({isProfit ? '+' : ''}{pnlPercent}%)</span>
                        </span>
                      </td>
                      <td>
                        <span className={`sp-position-day ${position.dayChange >= 0 ? 'profit' : 'loss'}`}>
                          {position.dayChange >= 0 ? '+' : ''}{position.dayChange.toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Positions Summary */}
          <div className="sp-positions-summary">
            <div className="sp-summary-card">
              <span className="sp-summary-label">Total Investment</span>
              <span className="sp-summary-value">₹{formatPrice(totals.investment)}</span>
            </div>
            <div className="sp-summary-card">
              <span className="sp-summary-label">Current Value</span>
              <span className="sp-summary-value">₹{formatPrice(totals.currentValue)}</span>
            </div>
            <div className={`sp-summary-card ${totals.pnl >= 0 ? 'profit' : 'loss'}`}>
              <span className="sp-summary-label">Day P&L</span>
              <span className="sp-summary-value">
                {totals.pnl >= 0 ? '+' : ''}₹{formatPrice(totals.pnl)}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Positions;
