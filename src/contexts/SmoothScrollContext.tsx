import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation } from 'react-router-dom';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextType {
  lenis: Lenis | null;
  refresh: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({ 
  lenis: null,
  refresh: () => {}
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const requestRef = useRef<number | null>(null);
  const location = useLocation();

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Reset scroll position on page change
    window.scrollTo(0, 0);
    
    // Initialize Lenis for smooth scrolling
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2, // Increase touch sensitivity
      infinite: false,
    });

    // Connect Lenis to GSAP's ticker
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });

    // Update ScrollTrigger when Lenis scrolls
    lenisInstance.on('scroll', ScrollTrigger.update);

    // Connect Lenis to ScrollTrigger
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenisInstance.scrollTo(value, { immediate: true });
        }
        return lenisInstance.scroll;
      },
      getBoundingClientRect() {
        return { 
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      pinType: document.documentElement.style.transform ? 'transform' : 'fixed'
    });

    // Update on window resize for responsive support
    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);

    setLenis(lenisInstance);

    // Cleanup
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
      gsap.ticker.remove(lenisInstance.raf);
      lenisInstance.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, []);
  
  // Handle route changes
  useEffect(() => {
    // Reset scroll position on route change
    window.scrollTo(0, 0);
    
    // Kill all active ScrollTriggers to prevent memory leaks and stale animations
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Clear any scroll memory
    ScrollTrigger.clearScrollMemory();
    
    // Force ScrollTrigger to recalculate everything
    ScrollTrigger.refresh(true);
    
    // Slight delay to ensure DOM is updated before refreshing
    const resetTimeout = setTimeout(() => {
      // Reset Lenis scroll to top
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      
      // Force a GSAP update
      ScrollTrigger.update();
    }, 50);
    
    return () => {
      clearTimeout(resetTimeout);
    };
  }, [location, lenis]);
  
  // Utility function to refresh ScrollTrigger and Lenis
  const refresh = () => {
    ScrollTrigger.refresh(true);
    if (lenis) {
      lenis.resize();
    }
  };
  
  return (
    <SmoothScrollContext.Provider value={{ lenis, refresh }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}; 