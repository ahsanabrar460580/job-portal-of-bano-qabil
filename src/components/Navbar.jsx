import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo(0, 0);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link 
          to="/" 
          className="navbar-logo"
          onClick={() => handleNavigation("/")}
        >
          <span className="logo-icon">🚀</span>
          <span className="logo-text">BanoQabil</span>
          <span className="logo-dot">.pk</span>
        </Link>

        {/* Hamburger Menu */}
        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="line line-1"></span>
          <span className="line line-2"></span>
          <span className="line line-3"></span>
        </button>

        {/* Navigation Menu */}
        <div className={`nav-overlay ${isMenuOpen ? "active" : ""}`} 
             onClick={() => setIsMenuOpen(false)}></div>

        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          {/* Home Link */}
          <li className="nav-item">
            <Link
              to="/"
              className="nav-link"
              onClick={() => handleNavigation("/")}
            >
              <span className="link-icon">🏠</span>
              Home
            </Link>
          </li>

          {!isAuthenticated ? (
            <>
              {/* Auth Links */}
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link"
                  onClick={() => handleNavigation("/login")}
                >
                  <span className="link-icon">🔐</span>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/register"
                  className="nav-link nav-link-primary"
                  onClick={() => handleNavigation("/register")}
                >
                  <span className="link-icon">✨</span>
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              {/* Student Menu */}
              {user?.role === "student" && (
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle"
                    onClick={() => toggleDropdown("student")}
                  >
                    <span className="link-icon">👨‍🎓</span>
                    Student
                    <span className={`dropdown-arrow ${activeDropdown === "student" ? "active" : ""}`}>
                      ▼
                    </span>
                  </button>
                  <ul className={`dropdown-menu ${activeDropdown === "student" ? "active" : ""}`}>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleNavigation("/student-profile")}
                      >
                        <span className="dropdown-icon">👤</span>
                        My Profile
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleNavigation("/skill-based-companies")}
                      >
                        <span className="dropdown-icon">🏢</span>
                        Find Companies
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleNavigation("/dashboard")}
                      >
                        <span className="dropdown-icon">📊</span>
                        Dashboard
                      </button>
                    </li>
                  </ul>
                </li>
              )}

              {/* Company Menu */}
              {user?.role === "company" && (
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle"
                    onClick={() => toggleDropdown("company")}
                  >
                    <span className="link-icon">🏢</span>
                    Company
                    <span className={`dropdown-arrow ${activeDropdown === "company" ? "active" : ""}`}>
                      ▼
                    </span>
                  </button>
                  <ul className={`dropdown-menu ${activeDropdown === "company" ? "active" : ""}`}>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleNavigation("/company-profile")}
                      >
                        <span className="dropdown-icon">🏭</span>
                        Company Profile
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleNavigation("/company-dashboard")}
                      >
                        <span className="dropdown-icon">👥</span>
                        Applications
                      </button>
                    </li>
                  </ul>
                </li>
              )}

              {/* Admin Menu */}
              {user?.role === "admin" && (
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle"
                    onClick={() => toggleDropdown("admin")}
                  >
                    <span className="link-icon">⚙️</span>
                    Admin
                    <span className={`dropdown-arrow ${activeDropdown === "admin" ? "active" : ""}`}>
                      ▼
                    </span>
                  </button>
                  <ul className={`dropdown-menu ${activeDropdown === "admin" ? "active" : ""}`}>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleNavigation("/admin-panel")}
                      >
                        <span className="dropdown-icon">🛡️</span>
                        Admin Panel
                      </button>
                    </li>
                  </ul>
                </li>
              )}

              {/* User Profile & Logout */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link user-profile"
                  onClick={() => toggleDropdown("profile")}
                >
                  <span className="user-avatar">{user?.name?.charAt(0).toUpperCase() || "U"}</span>
                  <span className="user-name">{user?.name || "User"}</span>
                  <span className={`dropdown-arrow ${activeDropdown === "profile" ? "active" : ""}`}>
                    ▼
                  </span>
                </button>
                <ul className={`dropdown-menu ${activeDropdown === "profile" ? "active" : ""}`}>
                  
                  <li className="dropdown-divider"></li>
                  <li>
                    <button
                      className="dropdown-item logout-btn"
                      onClick={handleLogout}
                    >
                      <span className="dropdown-icon">🚪</span>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;