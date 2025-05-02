import { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import './GalleryPage.css';

/**
 * Gallery page with live performance carousel and photo grid
 */
const GalleryPage = () => {
  // Using placeholder images that resemble the punk band aesthetic seen in the design
  const liveImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=1200&h=600&auto=format&fit=crop', alt: 'Live Performance', caption: 'Live at Underground Festival' },
    { id: 2, src: 'https://images.unsplash.com/photo-1563841930606-67e2bce48b78?q=80&w=1200&h=600&auto=format&fit=crop', alt: 'Band Performance', caption: 'Rocking Out' },
    { id: 3, src: 'https://images.unsplash.com/photo-1520176501380-9a174bf7c783?q=80&w=1200&h=600&auto=format&fit=crop', alt: 'Concert', caption: 'Latest Show' },
  ];
  
  const photoImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&h=400&auto=format&fit=crop', alt: 'Guitarist', category: 'band' },
    { id: 2, src: 'https://images.unsplash.com/photo-1468234560893-89c00b6385ff?q=80&w=600&h=400&auto=format&fit=crop', alt: 'Vocalist', category: 'band' },
    { id: 3, src: 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?q=80&w=600&h=400&auto=format&fit=crop', alt: 'Bassist', category: 'band' },
    { id: 4, src: 'https://images.unsplash.com/photo-1502773860571-211a597d6e4b?q=80&w=600&h=400&auto=format&fit=crop', alt: 'Drummer', category: 'band' },
    { id: 5, src: 'https://images.unsplash.com/photo-1549213783-8284d0336c4f?q=80&w=600&h=400&auto=format&fit=crop', alt: 'Crowd', category: 'fans' },
    { id: 6, src: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=600&h=400&auto=format&fit=crop', alt: 'Stage', category: 'venue' },
  ];
  
  const [currentLiveSlide, setCurrentLiveSlide] = useState(0);
  const [currentPhotoSet, setCurrentPhotoSet] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile view is active
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  const nextLiveSlide = () => {
    setCurrentLiveSlide((prev) => (prev === liveImages.length - 1 ? 0 : prev + 1));
  };
  
  const prevLiveSlide = () => {
    setCurrentLiveSlide((prev) => (prev === 0 ? liveImages.length - 1 : prev - 1));
  };

  const nextPhotoSet = () => {
    const maxSets = Math.ceil(photoImages.length / 3) - 1;
    setCurrentPhotoSet((prev) => (prev >= maxSets ? 0 : prev + 1));
  };
  
  const prevPhotoSet = () => {
    const maxSets = Math.ceil(photoImages.length / 3) - 1;
    setCurrentPhotoSet((prev) => (prev === 0 ? maxSets : prev - 1));
  };
  
  // Get current set of photos (3 for desktop, 1 for mobile if needed)
  const photosPerSet = isMobile ? 3 : 3;
  const currentPhotos = photoImages.slice(currentPhotoSet * photosPerSet, (currentPhotoSet * photosPerSet) + photosPerSet);
  
  return (
    <div className={`gallery-page ${isMobile ? 'mobile-gallery' : ''}`}>
      {/* Live Performance Section */}
      <div className="section-container live-section">
        <div className="section-title">
          <h2>LIVEEE!!!</h2>
        </div>
        
        <div className="carousel-container">
          <button className="carousel-button prev" onClick={prevLiveSlide}>❮</button>
          <div className="carousel-slide">
            {liveImages.map((image, index) => (
              <div 
                key={image.id} 
                className={`carousel-item ${index === currentLiveSlide ? 'active' : ''}`}
                style={{ transform: `translateX(${100 * (index - currentLiveSlide)}%)` }}
              >
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
          <button className="carousel-button next" onClick={nextLiveSlide}>❯</button>
        </div>
      </div>
      
      {/* Photos Section */}
      <div className="section-container photos-section">
        <div className="section-title">
          <h2>FOTIKOS</h2>
        </div>
        
        <div className="photo-gallery">
          <button className="gallery-button prev" onClick={prevPhotoSet}>❮</button>
          <div className="photo-grid">
            {currentPhotos.map((image) => (
              <div key={image.id} className="photo-item">
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
          <button className="gallery-button next" onClick={nextPhotoSet}>❯</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GalleryPage;