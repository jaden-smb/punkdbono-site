import './Footer.css';

/**
 * Footer component with contact information and social links
 */
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="contact-info">
          <div className="phone-number">+54 9115467501</div>
          <div className="email">punkdbono@gmail.com</div>
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
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} PunkD'Bono. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;