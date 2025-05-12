import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useSmoothScroll } from '../contexts/SmoothScrollContext';
import './MainLayout.css';

/**
 * Main layout component that wraps the entire application
 * Includes the navbar, content container, and footer
 */
const MainLayout: React.FC = () => {
  const location = useLocation();
  const { refresh } = useSmoothScroll();
  
  // Reset scroll and refresh on route change
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Force a layout recalculation
    document.body.style.display = 'none';
    document.body.offsetHeight; // Force reflow
    document.body.style.display = '';
    
    // Refresh scroll context after route change
    const timeoutId = setTimeout(() => {
      refresh();
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [location.pathname, refresh]);
  
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;