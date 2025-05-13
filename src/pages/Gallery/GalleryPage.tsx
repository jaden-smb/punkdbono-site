import { useState, useEffect, useRef } from 'react';
import './GalleryPage.css';
import gatoImage from '/images/illustrations/Gatomafioso.png';
import cerdoImage from '/images/illustrations/cerdo1.png';
import gsap from 'gsap';

/**
 * Gallery page with live performance carousel and photo grid
 * Enhanced with punk rock torn paper effect
 */
const GalleryPage = () => {
  // Use optimized band videos and photos from public folder
  const liveVideos = [
    { id: 1, src: '/images/videos-live/optimized/VID-20241124-WA0001.mp4', alt: 'Live Video 1', caption: 'Live Show 1' },
    { id: 2, src: '/images/videos-live/optimized/VID-20241124-WA0002.mp4', alt: 'Live Video 2', caption: 'Live Show 2' },
    { id: 3, src: '/images/videos-live/optimized/VID-20241124-WA0003.mp4', alt: 'Live Video 3', caption: 'Live Show 3' },
    { id: 4, src: '/images/videos-live/optimized/VID-20241124-WA0004.mp4', alt: 'Live Video 4', caption: 'Live Show 4' },
    { id: 5, src: '/images/videos-live/optimized/VID-20241124-WA0005.mp4', alt: 'Live Video 5', caption: 'Live Show 5' },
    { id: 6, src: '/images/videos-live/optimized/VID-20241124-WA0006.mp4', alt: 'Live Video 6', caption: 'Live Show 6' },
    { id: 7, src: '/images/videos-live/optimized/VID-20241124-WA0009.mp4', alt: 'Live Video 7', caption: 'Live Show 7' },
    { id: 8, src: '/images/videos-live/optimized/VID-20241124-WA0024.mp4', alt: 'Live Video 8', caption: 'Live Show 8' },
    { id: 9, src: '/images/videos-live/optimized/VID-20241124-WA0025.mp4', alt: 'Live Video 9', caption: 'Live Show 9' },
  ];

  const bandPhotos = [
    { id: 1, src: '/images/band/optimized/IMG-20241125-WA0127.jpg', alt: 'Band Photo 1' },
    { id: 2, src: '/images/band/optimized/IMG-20241125-WA0129.jpg', alt: 'Band Photo 2' },
    { id: 3, src: '/images/band/optimized/IMG-20241125-WA0131.jpg', alt: 'Band Photo 3' },
    { id: 4, src: '/images/band/optimized/IMG-20241125-WA0133.jpg', alt: 'Band Photo 4' },
    { id: 5, src: '/images/band/optimized/IMG-20241125-WA0135.jpg', alt: 'Band Photo 5' },
    { id: 6, src: '/images/band/optimized/IMG-20241125-WA0137.jpg', alt: 'Band Photo 6' },
    { id: 7, src: '/images/band/optimized/IMG-20241125-WA0139.jpg', alt: 'Band Photo 7' },
    { id: 8, src: '/images/band/optimized/IMG-20241125-WA0141.jpg', alt: 'Band Photo 8' },
    { id: 9, src: '/images/band/optimized/IMG-20241125-WA0143.jpg', alt: 'Band Photo 9' },
    { id: 10, src: '/images/band/optimized/IMG-20241125-WA0145.jpg', alt: 'Band Photo 10' },
    { id: 11, src: '/images/band/optimized/IMG-20241125-WA0147.jpg', alt: 'Band Photo 11' },
    { id: 12, src: '/images/band/optimized/IMG-20241125-WA0149.jpg', alt: 'Band Photo 12' },
    { id: 13, src: '/images/band/optimized/IMG-20241125-WA0115.jpg', alt: 'Band Photo 13' },
    { id: 14, src: '/images/band/optimized/IMG-20241125-WA0117.jpg', alt: 'Band Photo 14' },
    { id: 15, src: '/images/band/optimized/IMG-20241125-WA0119.jpg', alt: 'Band Photo 15' },
    { id: 16, src: '/images/band/optimized/IMG-20241125-WA0121.jpg', alt: 'Band Photo 16' },
    { id: 17, src: '/images/band/optimized/IMG-20241125-WA0123.jpg', alt: 'Band Photo 17' },
    { id: 18, src: '/images/band/optimized/IMG-20241125-WA0125.jpg', alt: 'Band Photo 18' },
  ];
  
  const [currentLiveSlide, setCurrentLiveSlide] = useState(0);
  const [currentPhotoSlide, setCurrentPhotoSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [distortionValues, setDistortionValues] = useState<number[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const intervalRef = useRef<number | null>(null);
  const gatoRef = useRef<HTMLImageElement>(null);
  const cerdoRef = useRef<HTMLImageElement>(null);
  
  // Initialize video refs array
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, liveVideos.length);
  }, [liveVideos.length]);
  
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
  
  // Initialize random distortion values for each item
  useEffect(() => {
    // Generate random distortion values for torn paper effect
    const generateDistortionValues = () => {
      const newValues = [];
      const itemCount = Math.max(liveVideos.length, bandPhotos.length);
      
      for (let i = 0; i < itemCount; i++) {
        // Random values for skew, rotation and edge effects
        newValues.push(Math.random() * 4 - 2); // Range: -2 to 2 degrees
      }
      
      setDistortionValues(newValues);
    };
    
    generateDistortionValues();
    
    // Add random periodic distortion to simulate damaged paper movement
    intervalRef.current = window.setInterval(() => {
      generateDistortionValues();
    }, 5000); // Update every 5 seconds
    
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [liveVideos.length, bandPhotos.length]);
  
  useEffect(() => {
    // Animate illustrations
    if (gatoRef.current) {
      gsap.fromTo(
        gatoRef.current,
        {
          opacity: 0,
          x: -100,
          y: 50,
          rotation: -15,
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
      gsap.to(gatoRef.current, {
        y: -10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }

    if (cerdoRef.current) {
      gsap.fromTo(
        cerdoRef.current,
        {
          opacity: 0,
          x: 100,
          y: 50,
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
          delay: 0.5
        }
      );

      // Add floating animation with different timing
      gsap.to(cerdoRef.current, {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }
  }, []);
  
  const pauseCurrentVideo = () => {
    const currentVideo = videoRefs.current[currentLiveSlide];
    if (currentVideo && !currentVideo.paused) {
      currentVideo.pause();
    }
  };
  
  const nextLiveSlide = () => {
    pauseCurrentVideo();
    setCurrentLiveSlide((prev) => (prev === liveVideos.length - 1 ? 0 : prev + 1));
  };

  const prevLiveSlide = () => {
    pauseCurrentVideo();
    setCurrentLiveSlide((prev) => (prev === 0 ? liveVideos.length - 1 : prev - 1));
  };

  const nextPhotoSlide = () => {
    setCurrentPhotoSlide((prev) => (prev === bandPhotos.length - 1 ? 0 : prev + 1));
  };

  const prevPhotoSlide = () => {
    setCurrentPhotoSlide((prev) => (prev === 0 ? bandPhotos.length - 1 : prev - 1));
  };

  // Only one photo per slide, both desktop and mobile
  const currentPhoto = bandPhotos[currentPhotoSlide];
  
  // Get random distortion value for current item
  const getDistortionStyle = (index: number) => {
    const distortion = distortionValues[index] || 0;
    return {
      transform: `rotate(${distortion}deg)`,
      filter: `brightness(${0.95 + Math.random() * 0.1})` // Slight random brightness variation
    };
  };
  
  return (
    <div className={`gallery-page ${isMobile ? 'mobile-gallery' : ''}`}>
      {/* Live Performance Section (Videos) */}
      <div className="section-container live-section">
        <div className="section-title">
          <h2>LIVEEE!!!</h2>
        </div>
        
        {/* Add Gato Mafioso illustration */}
        <img 
          ref={gatoRef}
          src={gatoImage} 
          alt="Gato Mafioso" 
          className="gallery-illustration gato"
          style={{
            position: 'absolute',
            top: isMobile ? '10px' : '30px',
            left: isMobile ? '10px' : '30px',
            width: isMobile ? '120px' : '220px',
            zIndex: 10,
            pointerEvents: 'none',
            transform: isMobile ? 'scale(0.8)' : 'scale(1)',
            transition: 'all 0.3s ease-in-out'
          }}
        />
        
        <div className="carousel-container" style={getDistortionStyle(0)}>
          <button className="carousel-button prev" onClick={prevLiveSlide}>❮</button>
          <div className="carousel-slide">
            {liveVideos.map((video, index) => (
              <div
                key={video.id}
                className={`carousel-item ${index === currentLiveSlide ? 'active' : ''}`}
                style={{
                  transform: `translateX(${100 * (index - currentLiveSlide)}%) scale(${index === currentLiveSlide ? 1 : 0.9}) rotateY(${index === currentLiveSlide ? 0 : (index < currentLiveSlide ? 20 : -20)}deg) rotate(${index === currentLiveSlide ? distortionValues[index % distortionValues.length] / 2 : 0}deg)`,
                  transition: 'transform 0.7s cubic-bezier(.77,0,.18,1)',
                  filter: index === currentLiveSlide ? `contrast(1.05) brightness(${0.95 + Math.random() * 0.1})` : ''
                }}
              >
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={video.src}
                  controls
                  poster="/images/LOGO-PUNKDBONO.png"
                  preload="none"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
          <button className="carousel-button next" onClick={nextLiveSlide}>❯</button>
        </div>
      </div>

      {/* Photos Section (Band Photos) */}
      <div className="section-container photos-section">
        <div className="section-title">
          <h2>FOTIKOS</h2>
        </div>
        
        {/* Add Cerdo illustration */}
        <img 
          ref={cerdoRef}
          src={cerdoImage} 
          alt="Cerdo" 
          className="gallery-illustration cerdo"
          style={{
            position: 'absolute',
            bottom: isMobile ? '10px' : '30px',
            right: isMobile ? '10px' : '30px',
            width: isMobile ? '130px' : '230px',
            zIndex: 10,
            pointerEvents: 'none',
            transform: isMobile ? 'scale(0.8)' : 'scale(1)',
            transition: 'all 0.3s ease-in-out'
          }}
        />
        
        <div className="photo-gallery" style={getDistortionStyle(1)}>
          <button className="gallery-button prev" onClick={prevPhotoSlide}>❮</button>
          <div className="photo-grid">
            <div className="photo-item" style={getDistortionStyle(currentPhotoSlide)}>
              <img
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                loading="lazy"
                style={{
                  transform: `scale(0.98) rotate(${distortionValues[currentPhotoSlide % distortionValues.length] / 3}deg)`,
                  transition: 'transform 0.7s cubic-bezier(.77,0,.18,1)'
                }}
              />
            </div>
          </div>
          <button className="gallery-button next" onClick={nextPhotoSlide}>❯</button>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;