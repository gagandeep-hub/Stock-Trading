import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navCollapseRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    // Also close Bootstrap collapse
    if (navCollapseRef.current) {
      navCollapseRef.current.classList.remove('show');
    }
  }, [location.pathname]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    // Manually close Bootstrap collapse
    if (navCollapseRef.current) {
      navCollapseRef.current.classList.remove('show');
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg custom-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container-fluid px-4">

        {/* Brand */}
        <Link className="navbar-brand brand" to="/" onClick={closeMenu}>
          <div className="logo-wrapper">
            <img
              src="/assets/logo (2).png"
              alt="Stock Pilot Logo"
              className="brand-logo"
            />
          </div>
          <span className="brand-name">STOCKPILOT</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          ref={navCollapseRef}
        >
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">

            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}
                to="/products"
                onClick={closeMenu}
              >
                Platform
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/pricing' ? 'active' : ''}`}
                to="/pricing"
                onClick={closeMenu}
              >
                Pricing
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                to="/about"
                onClick={closeMenu}
              >
                Company
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/support' ? 'active' : ''}`}
                to="/support"
                onClick={closeMenu}
              >
                Support
              </Link>
            </li>

            <li className="nav-item">
              <Link className="btn btn-accent ms-lg-2" to="/signup" onClick={closeMenu}>
                Get Started
                <span className="btn-arrow-nav">→</span>
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;