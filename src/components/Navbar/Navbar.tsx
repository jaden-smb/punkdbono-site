import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
// Changed from direct import to URL reference
import logoImage from '/images/LOGO-PUNKDBONO.png';
import MobileNav from './MobileNav';

/**
 * Navbar component for desktop view
 */
const Navbar = () => {
  const location = useLocation();
  
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <img src={logoImage} alt="PunkD'Bono Logo" className="logo-image" />
        </Link>
        
        {/* Desktop navigation */}
        <ul className="navbar-links">
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
      </nav>
      
      {/* Separate component for mobile navigation */}
      <MobileNav />
    </>
  );
};

export default Navbar;