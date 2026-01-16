import React from 'react';
import { Link } from 'react-router-dom';
import './Pricing.css';

const Pricing = () => {
  return (
    <section className='pricing-section'>
      <div className='container'>
        <div className='row align-items-center'>

          {/* LEFT CONTENT */}
          <div className='col-lg-5 col-sm-12 pricing-content'>
            <div className="section-badge">
              <span>Simple Pricing</span>
            </div>

            <h2>Unbeatable Pricing</h2>

            <p className='pricing-desc'>
              We pioneered the concept of transparent pricing in trading platforms.
              Flat fees and no hidden charges - trade with complete confidence.
            </p>

            <Link to="/pricing" className="pricing-link">
              <span>View Detailed Pricing</span>
              <span className="link-arrow">→</span>
            </Link>
          </div>

          <div className='col-lg-1'></div>

          {/* RIGHT PRICING CARDS */}
          <div className='col-lg-6 col-sm-12 pricing-cards'>
            <div className='row g-4'>

              <div className='col-md-6 col-sm-12'>
                <div className='pricing-card'>
                  <div className='price-badge free'>Free</div>
                  <h3 className="price-value">₹0</h3>
                  <p className='price-desc'>
                    Practice Account for Everyone
                  </p>
                  <div className='price-features'>
                    <div className='feature-check'>✓ ₹10,000 Virtual Cash</div>
                    <div className='feature-check'>✓ Unlimited Strategy Testing</div>
                    <div className='feature-check'>✓ No Credit Card Needed</div>
                  </div>
                </div>
              </div>

              <div className='col-md-6 col-sm-12'>
                <div className='pricing-card highlighted'>
                  <div className='price-badge popular'>Pro</div>
                  <h3 className="price-value">₹0</h3>
                  <p className='price-desc'>
                    Advanced Virtual Features
                  </p>
                  <div className='price-features'>
                    <div className='feature-check'>✓ Multi-Asset Tracking</div>
                    <div className='feature-check'>✓ Priority Live Data</div>
                    <div className='feature-check'>✓ Early Access to New Tools</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Pricing;