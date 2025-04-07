import { useState, useEffect } from 'react';
import './Navbar.css';

/**
 * Navbar component with responsive mobile menu
 */
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
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
  
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        PunkD'Bono
      </div>
      
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
        <li><a href="#" onClick={() => setMenuOpen(false)}>Home</a></li>
        <li><a href="#" onClick={() => setMenuOpen(false)}>Galeria</a></li>
        <li><a href="#" onClick={() => setMenuOpen(false)}>Blog</a></li>
        <li><a href="#" onClick={() => setMenuOpen(false)}>Noticias</a></li>
        <li><a href="#" onClick={() => setMenuOpen(false)}>About</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;