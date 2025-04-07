import React from 'react';
import './Footer.css';

/**
 * Footer component shared across all pages
 */
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>PunkD'Bono</h3>
          <p>Authentic punk rock for the modern era.</p>
          <p>Established 2020 in the underground scene.</p>
        </div>
        
        <div className="footer-section">
          <h3>Connect With Us</h3>
          <div className="social-links">
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">YouTube</a>
            <a href="#" className="social-link">Spotify</a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Upcoming Shows</h3>
          <p>May 15, 2025 - Underground Club, Berlin</p>
          <p>June 2, 2025 - Punk Festival, Barcelona</p>
          <p>July 20, 2025 - Summer Rock Fest, New York</p>
        </div>
        
        <div className="footer-section">
          <h3>Join Our Newsletter</h3>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 PunkD'Bono. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;