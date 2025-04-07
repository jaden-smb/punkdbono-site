import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

/**
 * Navbar component with responsive mobile menu
 */
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuOpen && 
          !(e.target as Element).closest('.navbar-menu') && 
          !(e.target as Element).closest('.hamburger')) {
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
  
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        PunkD'Bono
      </Link>
      
      {/* Hamburger icon for mobile */}
      <div 
        className={`hamburger ${menuOpen ? 'active' : ''}`} 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
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
            to="/blog" 
            className={location.pathname === '/blog' ? 'active' : ''}
          >
            Blog
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
    </nav>
  );
};

export default Navbar;