import { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import './GalleryPage.css';

/**
 * Gallery page with image carousel and photo grid
 */
const GalleryPage = () => {
  const carouselImages = [
    { id: 1, src: 'https://source.unsplash.com/random/1200x600/?punk-concert', alt: 'Live Performance', caption: 'Live at Underground Festival 2025' },
    { id: 2, src: 'https://source.unsplash.com/random/1200x600/?rock-band', alt: 'Band Members', caption: 'The Gang Backstage' },
    { id: 3, src: 'https://source.unsplash.com/random/1200x600/?studio-recording', alt: 'Recording Session', caption: 'Recording New Album' },
    { id: 4, src: 'https://source.unsplash.com/random/1200x600/?punk', alt: 'Fans', caption: 'Our Amazing Fans' },
  ];
  
  const galleryImages = [
    { id: 1, src: 'https://source.unsplash.com/random/600x400/?punk', alt: 'Band Photo 1', category: 'concerts' },
    { id: 2, src: 'https://source.unsplash.com/random/600x400/?guitar', alt: 'Band Photo 2', category: 'backstage' },
    { id: 3, src: 'https://source.unsplash.com/random/600x400/?drums', alt: 'Band Photo 3', category: 'concerts' },
    { id: 4, src: 'https://source.unsplash.com/random/600x400/?microphone', alt: 'Band Photo 4', category: 'studio' },
    { id: 5, src: 'https://source.unsplash.com/random/600x400/?stage', alt: 'Band Photo 5', category: 'concerts' },
    { id: 6, src: 'https://source.unsplash.com/random/600x400/?amplifier', alt: 'Band Photo 6', category: 'equipment' },
    { id: 7, src: 'https://source.unsplash.com/random/600x400/?crowd', alt: 'Band Photo 7', category: 'fans' },
    { id: 8, src: 'https://source.unsplash.com/random/600x400/?concert', alt: 'Band Photo 8', category: 'concerts' },
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };
  
  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);
  
  return (
    <div className="gallery-page">
      <div className="page-header">
        <h1>Photo Gallery</h1>
        <p>Check out our latest shows and behind-the-scenes moments</p>
      </div>
      
      {/* Image Carousel */}
      <div className="carousel-container">
        <button className="carousel-button prev" onClick={prevSlide}>❮</button>
        <div className="carousel-slide">
          {carouselImages.map((image, index) => (
            <div 
              key={image.id} 
              className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
              style={{ transform: `translateX(${100 * (index - currentSlide)}%)` }}
            >
              <img src={image.src} alt={image.alt} />
              <div className="carousel-caption">
                <h3>{image.caption}</h3>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-button next" onClick={nextSlide}>❯</button>
        
        <div className="carousel-indicators">
          {carouselImages.map((_, index) => (
            <button 
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
      
      {/* Photo Gallery */}
      <div className="gallery-section">
        <div className="gallery-filters">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'concerts' ? 'active' : ''}`}
            onClick={() => setActiveFilter('concerts')}
          >
            Concerts
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'backstage' ? 'active' : ''}`}
            onClick={() => setActiveFilter('backstage')}
          >
            Backstage
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'studio' ? 'active' : ''}`}
            onClick={() => setActiveFilter('studio')}
          >
            Studio
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'fans' ? 'active' : ''}`}
            onClick={() => setActiveFilter('fans')}
          >
            Fans
          </button>
        </div>
        
        <div className="gallery-grid">
          {filteredImages.map(image => (
            <div key={image.id} className="gallery-item">
              <img src={image.src} alt={image.alt} />
              <div className="overlay">
                <span className="category">{image.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default GalleryPage;