import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import './MainLayout.css';

/**
 * Main layout component that wraps the entire application
 * Includes the navbar and content container
 */
const MainLayout: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;