import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import guitarraImage from '/images/illustrations/guitarra.png';
import './NewsPage.css';

/**
 * News page component with featured Spanish article about 360° video
 */
const NewsPage = () => {
  const guitarraRef = useRef<HTMLImageElement>(null);
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
  
  useEffect(() => {
    // Animate guitarra illustration
    if (guitarraRef.current) {
      gsap.fromTo(
        guitarraRef.current,
        {
          opacity: 0,
          x: 100,
          y: -50,
          rotation: 15,
          scale: 0.8
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 1.2,
          ease: 'back.out(1.7)',
          delay: 0.3
        }
      );

      // Add floating animation
      gsap.to(guitarraRef.current, {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }
  }, []);
  
  return (
    <div className="news-page">
      <div className="page-header">
        <h1>Lo último...</h1>
        
        {/* Add Guitarra illustration */}
        <img 
          ref={guitarraRef}
          src={guitarraImage} 
          alt="Guitarra" 
          className="news-illustration"
          style={{
            position: 'absolute',
            top: isMobile ? '10px' : '30px',
            right: isMobile ? '10px' : '30px',
            width: isMobile ? '120px' : '220px',
            zIndex: 10,
            pointerEvents: 'none',
            transform: isMobile ? 'scale(0.8)' : 'scale(1)',
            transition: 'all 0.3s ease-in-out'
          }}
        />
      </div>
      
      <div className="news-container">
        <article className="news-card spanish-article featured">
          <div className="card-image">
            <a href="https://www.youtube.com/watch?v=EH3Y3F6RVhU">
              <img src="https://img.youtube.com/vi/EH3Y3F6RVhU/maxresdefault.jpg" alt="Video 360" />
            </a>
            <div className="card-tag">Nuevo</div>
          </div>
          <div className="card-content">
            <h3>¡Nuevo Videoclip en 360° Ya Disponible!</h3>
            <p>
              ¡Estamos emocionados de anunciar el lanzamiento de nuestro nuevo videoclip en formato 360°! 
              Esta experiencia inmersiva para nuestra canción "DIEZMO" permite a los fans 
              sentirse como si estuvieran en medio de uno de nuestros conciertos. 
            </p>
            <p>
              Visita nuestro canal de YouTube para ver el video completo y experimenta 
              la intensidad de PunkD'Bono como nunca antes.
            </p>
            <a href="https://www.youtube.com/watch?v=EH3Y3F6RVhU" className="read-more" target="_blank" rel="noopener noreferrer">Ver Video →</a>
          </div>
        </article>
      </div>
    </div>
  );
};

export default NewsPage;