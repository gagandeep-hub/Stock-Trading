import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";


// SVG Icons for menu items
const icons = {
  Dashboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  ),
  Orders: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12h6" />
      <path d="M9 16h6" />
    </svg>
  ),
  Holdings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path d="M12 3v6" />
      <path d="M12 15v6" />
    </svg>
  ),
  Positions: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M7 16l4-4 4 4 5-6" />
    </svg>
  ),
  Funds: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M12 9v6" />
      <path d="M9 12h6" />
    </svg>
  ),
};

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cookies, removeCookie] = useCookies([]);
  const location = useLocation();

  const { user, setUser } = useContext(AuthContext);

  const menuItems = ["Dashboard", "Orders", "Holdings", "Positions", "Funds"];

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    setUser(null);
    window.location.href = "http://localhost:5173/login";
  };

  // Sync selected menu with current route
  useEffect(() => {
    const path = location.pathname;
    if (path === "/" || path === "/dashboard") {
      setSelectedMenu(0);
    } else {
      const index = menuItems.findIndex(item =>
        path.toLowerCase().includes(item.toLowerCase())
      );
      if (index !== -1) setSelectedMenu(index);
    }
  }, [location.pathname]);

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const { data } = await axios.post(
          "https://stockpilot-7nuo.onrender.com/auth",
          {},
          { withCredentials: true }
        );

        if (!data.status) {
          window.location.href = "http://localhost:5173/login";
        } else {
          setUser(data.user);
        }
      } catch {
        window.location.href = "http://localhost:5173/login";
      }
    };

    verifyCookie();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.sp-profile-wrapper')) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return "SP";
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="sp-menu-container">
      {/* Logo */}
      <Link to="/" className="sp-logo" onClick={() => setSelectedMenu(0)}>
        <span className="sp-logo-text">STOCKPILOT</span>
      </Link>

      {/* Hamburger Menu Button - Mobile Only */}
      <button className="sp-hamburger" onClick={toggleMobileMenu} aria-label="Toggle menu">
        <span className={`sp-hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
        <span className={`sp-hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
        <span className={`sp-hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
      </button>

      {/* Navigation Menu */}
      <nav className={`sp-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <ul className="sp-nav-list">
          {menuItems.map((item, index) => (
            <li key={item} className="sp-nav-item">
              <Link
                to={index === 0 ? "/" : `/${item.toLowerCase()}`}
                className={`sp-nav-link ${selectedMenu === index ? 'active' : ''}`}
                onClick={() => handleMenuClick(index)}
              >
                <span className="sp-nav-icon">
                  {icons[item]}
                </span>
                <span className="sp-nav-text">{item}</span>
                {selectedMenu === index && <span className="sp-nav-indicator" />}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Profile Section */}
      <div className="sp-profile-wrapper">
        <button className="sp-profile-btn" onClick={handleProfileClick}>
          <div className="sp-avatar">
            {getInitials(user)}
          </div>
          <div className="sp-profile-info">
            <span className="sp-username">{user || "Guest"}</span>
            <span className="sp-profile-badge">Pro</span>
          </div>
          <svg
            className={`sp-chevron ${isProfileDropdownOpen ? 'open' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {isProfileDropdownOpen && (
          <div className="sp-dropdown">
            <div className="sp-dropdown-header">
              <div className="sp-dropdown-avatar">
                {getInitials(user)}
              </div>
              <div className="sp-dropdown-info">
                <span className="sp-dropdown-name">{user || "Guest User"}</span>
                <span className="sp-dropdown-email">Trading Account</span>
              </div>
            </div>
            <div className="sp-dropdown-divider" />
            <button className="sp-dropdown-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                <path d="M6 20v-1c0-2.21 2.69-4 6-4s6 1.79 6 4v1" />
              </svg>
              <span>Profile Settings</span>
            </button>
            <button className="sp-dropdown-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
              </svg>
              <span>Preferences</span>
            </button>
            <div className="sp-dropdown-divider" />
            <button className="sp-dropdown-item sp-logout" onClick={handleLogout}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <polyline points="16,17 21,12 16,7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
