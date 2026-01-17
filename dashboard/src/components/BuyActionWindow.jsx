import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext ";
import { watchlist } from "../data/data";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [orderMode, setOrderMode] = useState("BUY"); // BUY or SELL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [userHolding, setUserHolding] = useState(null);
  const [livePrice, setLivePrice] = useState(0);

  // Get initial stock price from watchlist
  const stockData = watchlist.find(s => s.name === uid);
  const basePrice = stockData?.price || 100; // Default price if not found

  // Simulate live price with small fluctuation
  useEffect(() => {
    // Set initial price
    setLivePrice(basePrice);

    // Update price every 2 seconds with small fluctuation
    const priceInterval = setInterval(() => {
      setLivePrice(prev => {
        const change = (Math.random() - 0.5) * (prev * 0.002);
        return prev + change;
      });
    }, 2000);

    return () => clearInterval(priceInterval);
  }, [basePrice]);

  // Fetch wallet balance and user holding for this stock
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get wallet balance
        const walletRes = await axios.get("https://stockpilot-7nuo.onrender.com/wallet", {
          withCredentials: true,
        });
        setWalletBalance(walletRes.data.balance);

        // Get user's holdings to check if they own this stock
        const holdingsRes = await axios.get("https://stockpilot-7nuo.onrender.com/allHoldings", {
          withCredentials: true,
        });
        const holding = holdingsRes.data.find(h => h.name === uid);
        setUserHolding(holding || null);

        // If user has holding, default to that quantity for sell
        if (holding && orderMode === "SELL") {
          setStockQuantity(Math.min(stockQuantity, holding.qty));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [uid]);

  // Recalculate when mode changes
  useEffect(() => {
    if (orderMode === "SELL" && userHolding) {
      setStockQuantity(Math.min(stockQuantity, userHolding.qty));
    }
  }, [orderMode, userHolding]);

  // Calculate order value with live price
  const orderValue = stockQuantity * livePrice;
  const canBuy = walletBalance >= orderValue && stockQuantity > 0;
  const canSell = userHolding && userHolding.qty >= stockQuantity && stockQuantity > 0;

  const handleOrderClick = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    // Validation
    if (stockQuantity <= 0) {
      setError("Please enter a valid quantity");
      setLoading(false);
      return;
    }

    if (orderMode === "BUY" && !canBuy) {
      setError(`Insufficient balance. Required: ₹${orderValue.toFixed(2)}`);
      setLoading(false);
      return;
    }

    if (orderMode === "SELL") {
      if (!userHolding) {
        setError("You don't own this stock. Buy first to sell.");
        setLoading(false);
        return;
      }
      if (userHolding.qty < stockQuantity) {
        setError(`You only own ${userHolding.qty} shares`);
        setLoading(false);
        return;
      }
    }

    try {
      const res = await axios.post(
        "https://stockpilot-7nuo.onrender.com/newOrder",
        {
          name: uid,
          qty: parseInt(stockQuantity),
          price: livePrice, // Use live price for both buy and sell
          mode: orderMode,
        },
        { withCredentials: true }
      );

      if (orderMode === "BUY") {
        setSuccess(`✓ Bought ${stockQuantity} shares of ${uid} at ₹${livePrice.toFixed(2)}`);
      } else {
        const saleValue = stockQuantity * livePrice;
        setSuccess(`✓ Sold ${stockQuantity} shares of ${uid}. ₹${saleValue.toFixed(2)} credited!`);
      }

      // Update wallet balance from response
      if (res.data.newBalance !== undefined) {
        setWalletBalance(res.data.newBalance);
      }

      // Refresh holding data
      const holdingsRes = await axios.get("https://stockpilot-7nuo.onrender.com/allHoldings", {
        withCredentials: true,
      });
      const holding = holdingsRes.data.find(h => h.name === uid);
      setUserHolding(holding || null);

      // Close window after success
      setTimeout(() => {
        generalContext.closeBuyWindow();
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Set max quantity for sell
  const maxSellQty = userHolding ? userHolding.qty : 0;

  return (
    <div className="sp-order-overlay" onClick={handleCancelClick}>
      <div className="sp-order-window" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={`sp-order-header ${orderMode.toLowerCase()}`}>
          <div className="sp-order-stock">
            <h3>{uid}</h3>
            <span className="sp-order-price">
              ₹{formatPrice(livePrice)}
              <span className="live-indicator">● LIVE</span>
            </span>
          </div>
          <button className="sp-order-close" onClick={handleCancelClick}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mode Toggle */}
        <div className="sp-order-tabs">
          <button
            className={`sp-order-tab ${orderMode === "BUY" ? "active buy" : ""}`}
            onClick={() => {
              setOrderMode("BUY");
              setError("");
              setSuccess("");
            }}
          >
            BUY
          </button>
          <button
            className={`sp-order-tab ${orderMode === "SELL" ? "active sell" : ""}`}
            onClick={() => {
              setOrderMode("SELL");
              setError("");
              setSuccess("");
              if (userHolding) {
                setStockQuantity(Math.min(stockQuantity, userHolding.qty));
              }
            }}
          >
            SELL
          </button>
        </div>

        {/* Order Form */}
        <div className="sp-order-body">
          {/* Wallet Balance */}
          <div className="sp-wallet-info">
            <span className="sp-wallet-label">Wallet Balance</span>
            <span className="sp-wallet-value">₹{formatPrice(walletBalance)}</span>
          </div>

          {/* Holdings Info (for sell) */}
          {orderMode === "SELL" && (
            <div className={`sp-holdings-info ${!userHolding ? 'warning' : ''}`}>
              <span className="sp-holdings-label">You Own</span>
              <span className="sp-holdings-value">
                {userHolding
                  ? `${userHolding.qty} shares @ ₹${formatPrice(userHolding.avg)} avg`
                  : "0 shares — Buy first to sell"}
              </span>
            </div>
          )}

          {/* Quantity Input */}
          <div className="sp-order-field">
            <label>Quantity</label>
            <div className="sp-qty-input-wrapper">
              <button
                className="sp-qty-btn"
                onClick={() => setStockQuantity(Math.max(1, stockQuantity - 1))}
                disabled={stockQuantity <= 1}
              >
                −
              </button>
              <input
                type="number"
                value={stockQuantity}
                onChange={(e) => {
                  const val = Math.max(1, parseInt(e.target.value) || 1);
                  if (orderMode === "SELL" && userHolding) {
                    setStockQuantity(Math.min(val, userHolding.qty));
                  } else {
                    setStockQuantity(val);
                  }
                }}
                min="1"
                max={orderMode === "SELL" ? maxSellQty : 9999}
                className="sp-qty-input"
              />
              <button
                className="sp-qty-btn"
                onClick={() => {
                  if (orderMode === "SELL" && userHolding) {
                    setStockQuantity(Math.min(stockQuantity + 1, userHolding.qty));
                  } else {
                    setStockQuantity(stockQuantity + 1);
                  }
                }}
                disabled={orderMode === "SELL" && stockQuantity >= maxSellQty}
              >
                +
              </button>
            </div>
            {orderMode === "SELL" && userHolding && (
              <button
                className="sp-sell-all-btn"
                onClick={() => setStockQuantity(userHolding.qty)}
              >
                Sell All ({userHolding.qty} shares)
              </button>
            )}
          </div>

          {/* Price Display (Live) */}
          <div className="sp-order-field">
            <label>Market Price (Live)</label>
            <div className="sp-price-display">
              ₹{formatPrice(livePrice)}
              <span className="sp-price-tag live">LIVE</span>
            </div>
          </div>

          {/* Order Summary */}
          <div className="sp-order-summary">
            <div className="sp-summary-row">
              <span>{orderMode === "BUY" ? "Total Cost" : "You'll Receive"}</span>
              <span className={`sp-summary-value ${orderMode === "SELL" ? "positive" : ""}`}>
                ₹{formatPrice(orderValue)}
              </span>
            </div>
            <div className="sp-summary-row">
              <span>Balance After</span>
              {orderMode === "BUY" ? (
                <span className={`sp-summary-value ${walletBalance - orderValue < 0 ? "negative" : ""}`}>
                  ₹{formatPrice(Math.max(0, walletBalance - orderValue))}
                </span>
              ) : (
                <span className="sp-summary-value positive">
                  ₹{formatPrice(walletBalance + orderValue)}
                </span>
              )}
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && <div className="sp-order-message error">{error}</div>}
          {success && <div className="sp-order-message success">{success}</div>}
        </div>

        {/* Footer */}
        <div className="sp-order-footer">
          <button className="sp-order-btn cancel" onClick={handleCancelClick}>
            Cancel
          </button>
          <button
            className={`sp-order-btn confirm ${orderMode.toLowerCase()}`}
            onClick={handleOrderClick}
            disabled={
              loading ||
              (orderMode === "BUY" && !canBuy) ||
              (orderMode === "SELL" && !canSell)
            }
          >
            {loading ? "Processing..." : orderMode === "BUY" ? `Buy ${uid}` : `Sell ${uid}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;