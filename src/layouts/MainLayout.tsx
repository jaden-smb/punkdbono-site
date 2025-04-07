import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import './MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * Main layout component that wraps the entire application
 * Includes the navbar and content container
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;