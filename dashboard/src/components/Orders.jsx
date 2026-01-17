import React, { useEffect, useState } from "react";
import api from "../utils/api";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // all, buy, sell

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/allOrders");
        setAllOrders(res.data);
      } catch (err) {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = allOrders.filter(order => {
    if (filter === "all") return true;
    return order.mode?.toLowerCase() === filter;
  });

  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="sp-orders">
        <div className="sp-orders-loading">
          <div className="sp-loader"></div>
          <span>Loading orders...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sp-orders">
        <div className="sp-orders-error">
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
    <div className="sp-orders">
      {/* Header */}
      <div className="sp-orders-header">
        <div className="sp-orders-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
            <path d="M9 12h6M9 16h6" />
          </svg>
          <h2>Orders</h2>
          <span className="sp-orders-count">{filteredOrders.length}</span>
        </div>

        <div className="sp-orders-filters">
          <button
            className={`sp-filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`sp-filter-btn buy ${filter === 'buy' ? 'active' : ''}`}
            onClick={() => setFilter('buy')}
          >
            Buy
          </button>
          <button
            className={`sp-filter-btn sell ${filter === 'sell' ? 'active' : ''}`}
            onClick={() => setFilter('sell')}
          >
            Sell
          </button>
        </div>
      </div>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <div className="sp-orders-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
          </svg>
          <h3>No orders yet</h3>
          <p>Your executed orders will appear here</p>
        </div>
      ) : (
        <div className="sp-orders-table-wrapper">
          <table className="sp-orders-table">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Type</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Value</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const totalValue = order.price * order.qty;
                const isBuy = order.mode?.toLowerCase() === 'buy';

                return (
                  <tr key={order._id}>
                    <td>
                      <div className="sp-order-stock">
                        <span className="sp-order-name">{order.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`sp-order-type ${isBuy ? 'buy' : 'sell'}`}>
                        {order.mode}
                      </span>
                    </td>
                    <td className="sp-order-qty">{order.qty}</td>
                    <td className="sp-order-price">₹{formatPrice(order.price)}</td>
                    <td className="sp-order-value">₹{formatPrice(totalValue)}</td>
                    <td>
                      <span className="sp-order-status completed">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        Executed
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
