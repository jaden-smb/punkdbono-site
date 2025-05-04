import { useState, useEffect } from 'react';
import DioramaScene from '../../components/Diorama/DioramaScene';
// Changed from direct import to URL reference
import bandImage from '/images/INICIO-BANDA.jpg';
import './HomePage.css';

/**
 * Home page component that matches the design in the image
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
    <div className={`home-page ${isMobile ? 'mobile-home' : ''}`}>
      <div className="hero-section">
        <img 
          src={bandImage} 
          alt="PunkD'Bono Band" 
          className="band-image" 
          loading="eager"
        />
      </div>
      
      <div className="content-section">
        <div className="diorama-section section-container">
          <h2 className="section-title-home">DIORAMA</h2>
          
          {/* 3D Diorama */}
          <div className="diorama-wrapper">
            <DioramaScene 
              isRotating={isRotating} 
              setIsRotating={setIsRotating} 
              isMobile={isMobile}
            />
            
            <div className="diorama-text">
              <p>
                Explora el universo de nuestra banda a través de este diorama 3D interactivo.
                {isMobile ? 
                  " Toca y arrastra para rotar la escena. Pellizca para acercar y alejar." : 
                  " Usa tu ratón para rotar la escena. Mantén presionado el clic izquierdo y arrastra para moverte. Desplázate para acercar y alejar."
                }
              </p>
              <p className="interaction-tip">
                {isRotating ? 
                  "✓ Rotación automática activada. Haz clic en el modelo para tomar el control." : 
                  "✓ Control manual activo. Haz doble clic en cualquier parte del modelo para activar la rotación automática."
                }
              </p>
            </div>
          </div>
        </div>
        
        <div className="threesixty-section section-container">
          <div className="threesixty-banner">
            <h3>Diezmo en 360°?</h3>
          </div>
        </div>
        
        <div className="video-section section-container">
          <h2 className="section-title-home">VIDEO</h2>
          <div className="video-placeholder">VIDEO</div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;