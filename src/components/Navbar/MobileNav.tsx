import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MobileNav.css';

/**
 * Mobile Navigation component that appears only on small screens
 */
const MobileNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuOpen && 
          !(e.target as Element).closest('.mobile-navbar-links') && 
          !(e.target as Element).closest('.mobile-hamburger')) {
        setMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);
  
  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);
  
  // Handle scroll behavior to hide hamburger
  useEffect(() => {
    const handleScroll = () => {
      // If scrolled down more than 10px, set isScrolled to true
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    // Add event listener
    window.addEventListener('scroll', handleScroll);
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className={`mobile-nav ${isScrolled ? 'scrolled' : ''}`}>
      {/* Hamburger icon for mobile */}
      <div 
        className={`mobile-hamburger ${menuOpen ? 'active' : ''}`} 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      {/* Mobile menu that slides in from the right */}
      <ul className={`mobile-navbar-links ${menuOpen ? 'active' : ''}`}>
        <li>
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/gallery" 
            className={location.pathname === '/gallery' ? 'active' : ''}
          >
            Galeria
          </Link>
        </li>
        <li>
          <Link 
            to="/news" 
            className={location.pathname === '/news' ? 'active' : ''}
          >
            Noticias
          </Link>
        </li>
        <li>
          <Link 
            to="/about" 
            className={location.pathname === '/about' ? 'active' : ''}
          >
            About
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileNav;
