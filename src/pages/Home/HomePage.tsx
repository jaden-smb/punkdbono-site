import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import DioramaScene from '../../components/Diorama/DioramaScene';
// Changed from direct import to URL reference
import bandImage from '/images/INICIO-BANDA.png';
import './HomePage.css';
import { useSmoothScroll } from '../../contexts/SmoothScrollContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  rockEntrance,
  textReveal,
  imageReveal,
  distortionEffect,
  videoSectionAnimation
} from '../../utils/animations';

/**
 * Home page component that matches the design in the image
 */
const HomePage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { lenis } = useSmoothScroll();
  const [isPageMounted, setIsPageMounted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  // Refs for animations
  const heroRef = useRef<HTMLDivElement>(null);
  const dioramaRef = useRef<HTMLDivElement>(null);
  const dioramaTitleRef = useRef<HTMLHeadingElement>(null);
  const dioramaTextRef = useRef<HTMLDivElement>(null);
  const threesixtyRef = useRef<HTMLDivElement>(null);
  const videoTitleRef = useRef<HTMLHeadingElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Mark component as mounted
  useEffect(() => {
    setIsPageMounted(true);
    
    return () => {
      setIsPageMounted(false);
      // Ensure all ScrollTrigger instances are cleaned up when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ScrollTrigger.clearScrollMemory();
    };
  }, []);
  
  // Handle video iframe loaded event
  const handleVideoIframeLoaded = () => {
    setVideoLoaded(true);
  };
  
  // Initialize animations with useLayoutEffect to ensure DOM is ready
  useLayoutEffect(() => {
    if (!lenis || !isPageMounted) return;
    
    // Add a small delay to ensure DOM is fully rendered
    const initTimeout = setTimeout(() => {
      // Clear any existing ScrollTrigger instances to prevent duplicates
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ScrollTrigger.refresh(true);
      
      // Initial page entrance animation
      const heroImage = heroRef.current?.querySelector('.band-image');
      if (heroImage) {
        // Adjust entrance animation for mobile
        rockEntrance(heroImage, isMobile ? 0.2 : 0);
      }
      
      // Scroll-triggered animations
      if (dioramaTitleRef.current) {
        distortionEffect(dioramaTitleRef.current);
      }
      
      if (dioramaTextRef.current && dioramaTextRef.current.children.length > 0) {
        ScrollTrigger.create({
          trigger: dioramaTextRef.current,
          start: 'top 80%',
          onEnter: () => textReveal(dioramaTextRef.current!, 0.2),
          once: true
        });
      }
      
      if (threesixtyRef.current) {
        const banner = threesixtyRef.current.querySelector('.threesixty-banner');
        if (banner) {
          ScrollTrigger.create({
            trigger: threesixtyRef.current,
            start: 'top 75%',
            onEnter: () => {
              gsap.fromTo(
                banner,
                { 
                  x: '-100%',
                  skewX: 20,
                  opacity: 0
                },
                { 
                  x: '0%',
                  skewX: 0,
                  opacity: 1,
                  duration: 0.8,
                  ease: 'power3.out'
                }
              );
            },
            once: true
          });
        }
      }
      
      if (videoTitleRef.current) {
        distortionEffect(videoTitleRef.current);
      }
      
      // Animate video container with special effects
      if (videoContainerRef.current) {
        // Apply different animation for mobile vs desktop
        if (isMobile) {
          // Enhanced mobile animation
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: videoContainerRef.current,
              start: 'top 75%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            }
          });

          tl.fromTo(
            videoContainerRef.current,
            {
              opacity: 0,
              scale: 0.8,
              clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)'
            },
            {
              opacity: 1,
              scale: 1,
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              duration: 0.8,
              ease: 'power3.out',
            }
          );

          // Add a pulsing glow effect after appearance
          tl.to(videoContainerRef.current, {
            boxShadow: '0 0 30px rgba(242, 27, 7, 0.6), 0 0 15px rgba(5, 242, 219, 0.5)',
            repeat: 2,
            yoyo: true,
            duration: 0.5,
          });
        } else {
          // Enhanced desktop animation with multi-step sequence
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: videoContainerRef.current,
              start: 'top 70%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            }
          });

          // First create element for video "scanlines" effect
          const scanlines = document.createElement('div');
          scanlines.className = 'video-scanlines';
          videoContainerRef.current.appendChild(scanlines);
          
          // Create custom 360° indicator element that we can animate
          const indicator = document.createElement('div');
          indicator.className = 'indicator-360';
          indicator.textContent = '360°';
          videoContainerRef.current.appendChild(indicator);

          // Initial reveal with clip path and glitch effect
          tl.fromTo(
            videoContainerRef.current,
            {
              opacity: 0,
              scale: 0.9,
              clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
              filter: 'brightness(1.5) contrast(1.2)',
            },
            {
              opacity: 1,
              scale: 1,
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              filter: 'brightness(1) contrast(1)',
              duration: 1.2,
              ease: 'power3.inOut',
            }
          )
          // Add glitch effect during animation
          .fromTo(
            videoContainerRef.current,
            { x: 0 },
            {
              x: '+=5',
              yoyo: true,
              repeat: 10,
              duration: 0.05,
              ease: 'none',
            }, 
            '<+=0.2'
          )
          // Create a glitch overlay element
          .call(() => {
            const glitchOverlay = document.createElement('div');
            glitchOverlay.className = 'video-glitch-overlay';
            videoContainerRef.current.appendChild(glitchOverlay);
            
            // Short burst of glitch animation
            gsap.to(glitchOverlay, {
              opacity: 0.8,
              duration: 0.2,
              yoyo: true,
              repeat: 4,
              onComplete: () => {
                // Remove the overlay after animation
                setTimeout(() => {
                  if (videoContainerRef.current && videoContainerRef.current.contains(glitchOverlay)) {
                    videoContainerRef.current.removeChild(glitchOverlay);
                  }
                }, 1000);
              }
            });
          }, null, '<+=0.3')
          // Add the scanlines effect
          .fromTo(
            scanlines,
            { opacity: 0.8 },
            { 
              opacity: 0,
              duration: 1.5,
              ease: 'power2.inOut',
            },
            '<'
          )
          // Fade in the 360° indicator with a bounce effect
          .fromTo(
            indicator,
            { opacity: 0, scale: 0.5, rotation: -180 },
            { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' },
            '>-0.8'
          )
          // Pulse the border color
          .fromTo(
            videoContainerRef.current, 
            { borderColor: 'var(--bright-red)' },
            { 
              borderColor: 'var(--turquoise)', 
              duration: 0.8, 
              ease: 'power1.inOut',
              onComplete: () => {
                // Make sure video is fully visible
                gsap.set(videoContainerRef.current, { overflow: 'visible' });
              }
            },
            '>-0.5'
          );

          // Add hover animation for desktop
          videoContainerRef.current.addEventListener('mouseenter', () => {
            gsap.to(videoContainerRef.current, {
              scale: 1.03,
              boxShadow: '0 25px 50px rgba(242, 27, 7, 0.6), 0 15px 30px rgba(5, 242, 219, 0.5)',
              borderColor: 'var(--bright-red)',
              duration: 0.4,
              ease: 'power2.out',
            });
            
            // Animate the 360° indicator on hover
            gsap.to(indicator, {
              scale: 1.2,
              rotation: 360,
              boxShadow: '0 0 15px rgba(242, 27, 7, 1), 0 0 20px rgba(5, 242, 219, 0.8)',
              duration: 0.6,
              ease: 'power2.out'
            });
          });

          videoContainerRef.current.addEventListener('mouseleave', () => {
            gsap.to(videoContainerRef.current, {
              scale: 1,
              boxShadow: '0 20px 40px rgba(242, 27, 7, 0.4), 0 10px 20px rgba(5, 242, 219, 0.3)',
              borderColor: 'var(--turquoise)',
              duration: 0.6,
              ease: 'power2.inOut',
            });
            
            // Reset the 360° indicator
            gsap.to(indicator, {
              scale: 1,
              rotation: 0,
              boxShadow: '0 0 10px rgba(242, 27, 7, 0.7)',
              duration: 0.6,
              ease: 'power2.inOut'
            });
          });
        }
      }
      
      // Force GSAP to recalculate positions
      gsap.delayedCall(0.1, () => {
        ScrollTrigger.refresh();
        // Force any lazy-loaded content to update
        window.dispatchEvent(new Event('resize'));
      });
    }, 100); // Small delay to ensure DOM is ready
    
    // Clean up
    return () => {
      clearTimeout(initTimeout);
      // Kill all ScrollTrigger instances to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.refresh(true);
    };
  }, [lenis, isMobile, isPageMounted, videoLoaded]);
  
  // Force refresh on visibility change (useful when browser tab becomes active again)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // When tab becomes visible, refresh triggers
        ScrollTrigger.refresh();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  return (
    <div className={`home-page ${isMobile ? 'mobile-home' : ''}`}>
      <div className="hero-section" ref={heroRef}>
        <img 
          src={bandImage} 
          alt="PunkD'Bono Band" 
          className={`band-image ${isMobile ? 'mobile-band-image' : ''}`} 
          loading="eager"
        />
      </div>
      
      <div className="content-section">
        <div className="diorama-section section-container" ref={dioramaRef}>
          <h2 className="section-title-home" ref={dioramaTitleRef}>DIORAMA</h2>
          
          {/* 3D Diorama */}
          <div className="diorama-wrapper">
            <DioramaScene isMobile={isMobile} key={isPageMounted ? 'mounted' : 'unmounted'} />
            
            <div className="diorama-text" ref={dioramaTextRef}>
              <p>
                Oee interactúe con este diorama 3D representando el lugar favorito de los miembros de PunkD'Bono.
                {isMobile ? 
                  " Toca y arrastra para rotar la escena. Pellizca para acercar y alejar." : 
                  " Mantén presionado el eje izquierdo y arrastra para moverte. Desplázate para acerca y alejar."
                }
              </p>
            </div>
          </div>
        </div>
        
        <div className="threesixty-section section-container" ref={threesixtyRef}>
          <div className="threesixty-banner">
            <h3 className="rock-title">
              <span className="glitch-text" data-text="Diezmo en 360°?">Diezmo en 360°?</span>
            </h3>
          </div>
        </div>
        
        <div className="video-section section-container">
          <div className="video-container" ref={videoContainerRef}>
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/EH3Y3F6RVhU?vr=1&gyroscope=1&enablejsapi=1&playsinline=1&controls=1" 
              title="PunkD'Bono Video"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; vr" 
              allowFullScreen
              onLoad={handleVideoIframeLoaded}
            ></iframe>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;