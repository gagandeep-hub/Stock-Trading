import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const Funds = () => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Fetch wallet data
  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const res = await api.get("/wallet");
      setWallet(res.data);
    } catch (err) {
      setError("Failed to load wallet");
    } finally {
      setLoading(false);
    }
  };

  const handleAddFunds = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setMessage({ text: "Please enter a valid amount", type: "error" });
      return;
    }

    setProcessing(true);
    try {
      const res = await api.post("/wallet/add", { amount: parseFloat(amount) });
      setWallet(res.data.wallet);
      setMessage({ text: `₹${amount} added successfully!`, type: "success" });
      setAmount("");
      setTimeout(() => {
        setShowAddModal(false);
        setMessage({ text: "", type: "" });
      }, 1500);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Failed to add funds", type: "error" });
    } finally {
      setProcessing(false);
    }
  };

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setMessage({ text: "Please enter a valid amount", type: "error" });
      return;
    }

    if (parseFloat(amount) > wallet.balance) {
      setMessage({ text: "Insufficient balance", type: "error" });
      return;
    }

    setProcessing(true);
    try {
      const res = await api.post("/wallet/withdraw", { amount: parseFloat(amount) });
      setWallet(res.data.wallet);
      setMessage({ text: `₹${amount} withdrawn successfully!`, type: "success" });
      setAmount("");
      setTimeout(() => {
        setShowWithdrawModal(false);
        setMessage({ text: "", type: "" });
      }, 1500);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Failed to withdraw", type: "error" });
    } finally {
      setProcessing(false);
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const quickAmounts = [500, 1000, 2000, 5000];

  if (loading) {
    return (
      <div className="sp-funds">
        <div className="sp-funds-loading">
          <div className="sp-loader"></div>
          <span>Loading wallet...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sp-funds">
        <div className="sp-funds-error">
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
    <div className="sp-funds">
      {/* Header */}
      <div className="sp-funds-header">
        <div className="sp-funds-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M12 9v6M9 12h6" />
          </svg>
          <h2>Funds</h2>
        </div>
      </div>

      {/* Balance Card */}
      <div className="sp-balance-card">
        <div className="sp-balance-header">
          <span className="sp-balance-label">Available Balance</span>
          <div className="sp-welcome-badge">Virtual Trading</div>
        </div>
        <div className="sp-balance-amount">
          <span className="sp-currency">₹</span>
          <span className="sp-balance-value">{formatPrice(wallet?.balance || 0)}</span>
        </div>
        <div className="sp-balance-actions">
          <button className="sp-fund-btn add" onClick={() => setShowAddModal(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Funds
          </button>
          <button className="sp-fund-btn withdraw" onClick={() => setShowWithdrawModal(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14" />
            </svg>
            Withdraw
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="sp-funds-stats">
        <div className="sp-stat-card">
          <div className="sp-stat-icon deposited">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
          <div className="sp-stat-info">
            <span className="sp-stat-label">Total Deposited</span>
            <span className="sp-stat-value">₹{formatPrice(wallet?.totalDeposited || 0)}</span>
          </div>
        </div>
        <div className="sp-stat-card">
          <div className="sp-stat-icon withdrawn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </div>
          <div className="sp-stat-info">
            <span className="sp-stat-label">Total Withdrawn</span>
            <span className="sp-stat-value">₹{formatPrice(wallet?.totalWithdrawn || 0)}</span>
          </div>
        </div>
        <div className="sp-stat-card">
          <div className="sp-stat-icon net">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18" />
              <path d="M7 16l4-4 4 4 5-6" />
            </svg>
          </div>
          <div className="sp-stat-info">
            <span className="sp-stat-label">Initial Bonus</span>
            <span className="sp-stat-value bonus">₹10,000.00</span>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="sp-funds-info">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        <div className="sp-info-content">
          <h4>Virtual Trading Account</h4>
          <p>This is a practice account with virtual money. Every new user receives ₹10,000 to start trading. Use it to learn and practice trading strategies without risking real money!</p>
        </div>
      </div>

      {/* Add Funds Modal */}
      {showAddModal && (
        <div className="sp-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="sp-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sp-modal-header">
              <h3>Add Funds</h3>
              <button className="sp-modal-close" onClick={() => setShowAddModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="sp-modal-body">
              <div className="sp-amount-input-wrapper">
                <span className="sp-input-prefix">₹</span>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="sp-amount-input"
                />
              </div>
              <div className="sp-quick-amounts">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    className="sp-quick-btn"
                    onClick={() => setAmount(amt.toString())}
                  >
                    +₹{amt}
                  </button>
                ))}
              </div>
              {message.text && (
                <div className={`sp-modal-message ${message.type}`}>
                  {message.text}
                </div>
              )}
            </div>
            <div className="sp-modal-footer">
              <button className="sp-modal-btn cancel" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button
                className="sp-modal-btn confirm"
                onClick={handleAddFunds}
                disabled={processing}
              >
                {processing ? "Processing..." : "Add Funds"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="sp-modal-overlay" onClick={() => setShowWithdrawModal(false)}>
          <div className="sp-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sp-modal-header">
              <h3>Withdraw Funds</h3>
              <button className="sp-modal-close" onClick={() => setShowWithdrawModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="sp-modal-body">
              <p className="sp-withdraw-balance">Available: ₹{formatPrice(wallet?.balance || 0)}</p>
              <div className="sp-amount-input-wrapper">
                <span className="sp-input-prefix">₹</span>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="sp-amount-input"
                  max={wallet?.balance}
                />
              </div>
              <button
                className="sp-withdraw-all"
                onClick={() => setAmount(wallet?.balance?.toString() || "0")}
              >
                Withdraw All
              </button>
              {message.text && (
                <div className={`sp-modal-message ${message.type}`}>
                  {message.text}
                </div>
              )}
            </div>
            <div className="sp-modal-footer">
              <button className="sp-modal-btn cancel" onClick={() => setShowWithdrawModal(false)}>
                Cancel
              </button>
              <button
                className="sp-modal-btn confirm withdraw"
                onClick={handleWithdraw}
                disabled={processing}
              >
                {processing ? "Processing..." : "Withdraw"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Funds;
