import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About JobPortal</h3>
          <p>Finding your dream job has never been easier.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/internships">Internships</a></li>
            <li><a href="/companies">Companies</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email:info@jobportal.com</p>
          <p>Phone:+1-800-123</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 JobPortal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
