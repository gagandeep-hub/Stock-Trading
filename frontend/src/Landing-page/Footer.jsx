import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">

        <div className="row gy-4 align-items-start">

          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <Link to="/" className="footer-brand">
              <div className="footer-logo-wrapper">
                <img src="/assets/logo (2).png" alt="Stock Pilot logo" />
              </div>
              <span className="footer-brand-name">STOCK PILOT</span>
            </Link>

            <p className="footer-desc">
              A high-fidelity stock trading simulator built for mastering
              market strategies with zero financial risk.
            </p>

            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="footer-title">Product</h6>
            <ul className="footer-links">
              <li><Link to="/products">Platform</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/products">Features</Link></li>
              <li><Link to="/products">API</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="footer-title">Company</h6>
            <ul className="footer-links">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/about">Careers</Link></li>
              <li><Link to="/support">Contact</Link></li>
              <li><Link to="/about">Blog</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="footer-title">Support</h6>
            <ul className="footer-links">
              <li><Link to="/support">Help Center</Link></li>
              <li><Link to="/support">Documentation</Link></li>
              <li><Link to="/support">Community</Link></li>
              <li><Link to="/support">Status</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="footer-title">Legal</h6>
            <ul className="footer-links">
              <li><Link to="/support">Privacy</Link></li>
              <li><Link to="/support">Terms</Link></li>
              <li><Link to="/support">Security</Link></li>
              <li><Link to="/support">Cookies</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-disclaimer">
            <p>
              <strong>Educational Project:</strong> Stock Pilot is created for learning purposes.
              It does not provide real financial trading or investment services.
            </p>
          </div>

          <div className="footer-copyright">
            <p>© 2026 Stock Pilot. All rights reserved. Built with passion for learning.</p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;