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

const Holdings = () => {
    const [allHoldings, setAllHoldings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [marketOpen, setMarketOpen] = useState(isMarketOpen());

    // Fetch holdings from API
    useEffect(() => {
        const fetchHoldings = async () => {
            try {
                const res = await axios.get("http://localhost:3002/allHoldings", {
                    withCredentials: true,
                });
                // Add live price tracking
                const holdingsWithLivePrices = res.data.map(holding => ({
                    ...holding,
                    livePrice: holding.price,
                    dayChange: (Math.random() - 0.5) * 3, // Random initial day change
                }));
                setAllHoldings(holdingsWithLivePrices);
            } catch (err) {
                setError("Failed to load holdings");
            } finally {
                setLoading(false);
            }
        };

        fetchHoldings();
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
        if (allHoldings.length === 0) return;

        const interval = setInterval(() => {
            setAllHoldings(prev => prev.map(holding => {
                const priceChange = (Math.random() - 0.5) * (holding.livePrice * 0.003);
                const newPrice = holding.livePrice + priceChange;
                const dayChangeUpdate = (priceChange / holding.avg) * 100;

                return {
                    ...holding,
                    livePrice: newPrice,
                    dayChange: holding.dayChange + dayChangeUpdate * 0.1,
                };
            }));
        }, 2500);

        return () => clearInterval(interval);
    }, [allHoldings.length]);

    // Calculate totals
    const totals = allHoldings.reduce((acc, holding) => {
        const investment = holding.avg * holding.qty;
        const currentValue = holding.livePrice * holding.qty;
        const pnl = currentValue - investment;

        return {
            investment: acc.investment + investment,
            currentValue: acc.currentValue + currentValue,
            pnl: acc.pnl + pnl,
        };
    }, { investment: 0, currentValue: 0, pnl: 0 });

    const pnlPercent = totals.investment > 0
        ? ((totals.pnl / totals.investment) * 100).toFixed(2)
        : 0;

    const formatPrice = (price) => {
        return price.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    if (loading) {
        return (
            <div className="sp-holdings">
                <div className="sp-holdings-loading">
                    <div className="sp-loader"></div>
                    <span>Loading holdings...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="sp-holdings">
                <div className="sp-holdings-error">
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
        <div className="sp-holdings">
            {/* Header */}
            <div className="sp-holdings-header">
                <div className="sp-holdings-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path d="M12 3v6M12 15v6" />
                    </svg>
                    <h2>Holdings</h2>
                    <span className="sp-holdings-count">{allHoldings.length}</span>
                </div>
            </div>

            {/* Holdings Table */}
            {allHoldings.length === 0 ? (
                <div className="sp-holdings-empty">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h3>No holdings yet</h3>
                    <p>Buy stocks to build your portfolio</p>
                </div>
            ) : (
                <>
                    <div className="sp-holdings-table-wrapper">
                        <table className="sp-holdings-table">
                            <thead>
                                <tr>
                                    <th>Stock</th>
                                    <th>Qty</th>
                                    <th>Avg Price</th>
                                    <th>LTP</th>
                                    <th>Current Value</th>
                                    <th>P&L</th>
                                    <th>Day Chg</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allHoldings.map((holding, index) => {
                                    const investment = holding.avg * holding.qty;
                                    const currentValue = holding.livePrice * holding.qty;
                                    const pnl = currentValue - investment;
                                    const pnlPercent = ((pnl / investment) * 100).toFixed(2);
                                    const isProfit = pnl >= 0;

                                    return (
                                        <tr key={index}>
                                            <td>
                                                <span className="sp-holding-name">{holding.name}</span>
                                            </td>
                                            <td className="sp-holding-qty">{holding.qty}</td>
                                            <td className="sp-holding-price">₹{formatPrice(holding.avg)}</td>
                                            <td className="sp-holding-ltp">₹{formatPrice(holding.livePrice)}</td>
                                            <td className="sp-holding-value">₹{formatPrice(currentValue)}</td>
                                            <td>
                                                <span className={`sp-holding-pnl ${isProfit ? 'profit' : 'loss'}`}>
                                                    {isProfit ? '+' : ''}₹{formatPrice(pnl)}
                                                    <span className="sp-pnl-percent">({isProfit ? '+' : ''}{pnlPercent}%)</span>
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`sp-holding-day ${holding.dayChange >= 0 ? 'profit' : 'loss'}`}>
                                                    {holding.dayChange >= 0 ? '+' : ''}{holding.dayChange.toFixed(2)}%
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Portfolio Summary */}
                    <div className="sp-holdings-summary">
                        <div className="sp-summary-card">
                            <span className="sp-summary-label">Total Investment</span>
                            <span className="sp-summary-value">₹{formatPrice(totals.investment)}</span>
                        </div>
                        <div className="sp-summary-card">
                            <span className="sp-summary-label">Current Value</span>
                            <span className="sp-summary-value">₹{formatPrice(totals.currentValue)}</span>
                        </div>
                        <div className={`sp-summary-card ${totals.pnl >= 0 ? 'profit' : 'loss'}`}>
                            <span className="sp-summary-label">Total P&L</span>
                            <span className="sp-summary-value">
                                {totals.pnl >= 0 ? '+' : ''}₹{formatPrice(totals.pnl)}
                                <span className="sp-summary-percent">({totals.pnl >= 0 ? '+' : ''}{pnlPercent}%)</span>
                            </span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Holdings;
