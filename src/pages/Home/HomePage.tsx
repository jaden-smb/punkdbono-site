import { useState, useEffect } from 'react';
import DioramaScene from '../../components/Diorama/DioramaScene';
import Footer from '../../components/Footer/Footer';
import './HomePage.css';

/**
 * Home page component with hero section, 3D diorama, and footer
 */
const HomePage = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="band-title">PunkD'Bono</h1>
        <p className="band-subtitle">Rock your world with our latest album</p>
      </div>
      
      {/* 3D Diorama */}
      <DioramaScene 
        isRotating={isRotating} 
        setIsRotating={setIsRotating} 
        isMobile={isMobile}
      />
      
      <section className="band-description">
        <h2>Welcome to the Official Website</h2>
        <p>
          PunkD'Bono is a revolutionary punk rock band that blends classic punk energy with modern 
          sound engineering. Founded in 2020, our band has quickly risen through the ranks of the 
          underground music scene with our authentic sound and energetic performances.
        </p>
        <p>
          Our music speaks truth to power while delivering catchy hooks and raw emotional power. 
          Whether you're a longtime punk enthusiast or new to the genre, our unique sound will 
          captivate your imagination and get your heart racing.
        </p>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;