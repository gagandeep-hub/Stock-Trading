import React, { useState, useContext, useEffect } from 'react';
import { watchlist } from '../data/data';
import { Tooltip, Grow } from "@mui/material";
import GeneralContext from './GeneralContext ';

const WatchList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [liveStocks, setLiveStocks] = useState(
    watchlist.map(stock => ({
      ...stock,
      livePrice: parseFloat(stock.price) || Math.random() * 2000 + 100,
      livePercent: parseFloat(stock.percent) || (Math.random() - 0.5) * 5,
    }))
  );

  // Simulate live price updates - ALWAYS ON for practice mode
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStocks(prev => prev.map(stock => {
        const priceChange = (Math.random() - 0.5) * (stock.livePrice * 0.002);
        const newPrice = stock.livePrice + priceChange;
        const percentChange = (priceChange / stock.livePrice) * 100;
        const newPercent = stock.livePercent + percentChange * 0.1;

        return {
          ...stock,
          livePrice: newPrice,
          livePercent: newPercent,
          isDown: newPercent < 0,
        };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const filteredWatchlist = liveStocks.filter(stock =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="sp-watchlist">
      {/* Search Header */}
      <div className="sp-watchlist-header">
        <div className="sp-search-box">
          <svg className="sp-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search stocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="sp-search-input"
          />
        </div>
        <div className="sp-watchlist-count">
          <span className="sp-count-current">{filteredWatchlist.length}</span>
          <span className="sp-count-divider">/</span>
          <span className="sp-count-total">50</span>
        </div>
      </div>

      {/* Stock List */}
      <ul className="sp-stock-list">
        {filteredWatchlist.map((stock, index) => (
          <WatchListItem stock={stock} key={index} />
        ))}
      </ul>

      {/* Watchlist Tabs */}
      <div className="sp-watchlist-tabs">
        <button className="sp-tab active">1</button>
        <button className="sp-tab">2</button>
        <button className="sp-tab">3</button>
        <button className="sp-tab">4</button>
        <button className="sp-tab">5</button>
      </div>
    </div>
  );
};

const WatchListItem = ({ stock }) => {
  const [showActions, setShowActions] = useState(false);

  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const formatPercent = (percent) => {
    const sign = percent >= 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`;
  };

  return (
    <li
      className="sp-stock-item"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="sp-stock-info">
        <div className="sp-stock-name-row">
          <span className={`sp-stock-name ${stock.isDown ? 'down' : 'up'}`}>
            {stock.name}
          </span>
          {stock.isDown ? (
            <svg className="sp-trend-icon down" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 15l-6 6-6-6" />
            </svg>
          ) : (
            <svg className="sp-trend-icon up" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 9l-6-6-6 6" />
            </svg>
          )}
        </div>
      </div>

      <div className="sp-stock-data">
        <span className={`sp-stock-change ${stock.isDown ? 'down' : 'up'}`}>
          {formatPercent(stock.livePercent)}
        </span>
        <span className="sp-stock-price">{formatPrice(stock.livePrice)}</span>
      </div>

      {showActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };

  const handleSellClick = () => {
    // Open the same window but we'll switch to sell mode
    generalContext.openBuyWindow(uid);
  };

  return (
    <div className="sp-stock-actions">
      <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
        <button className="sp-action-buy" onClick={handleBuyClick}>
          B
        </button>
      </Tooltip>
      <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
        <button className="sp-action-sell" onClick={handleSellClick}>
          S
        </button>
      </Tooltip>
      <Tooltip title="Analytics" placement="top" arrow TransitionComponent={Grow}>
        <button className="sp-action-more">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3v18h18" />
            <path d="M7 16l4-4 4 4 5-6" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
        <button className="sp-action-more">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </Tooltip>
    </div>
  );
};

export default WatchList;
