import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Ensure GSAP plugins are registered
gsap.registerPlugin(ScrollTrigger);

// Rock band-style entrance animation
export const rockEntrance = (element: string | Element, delay: number = 0) => {
  return gsap.from(element, {
    duration: 0.8,
    opacity: 0,
    scale: 0.85,
    y: 50,
    rotation: -3,
    ease: 'power2.out',
    delay,
    clearProps: 'all',
  });
};

// Gritty text reveal animation
export const textReveal = (element: string | Element, delay: number = 0) => {
  const chars = typeof element === 'string' 
    ? gsap.utils.toArray(element + ' > *') 
    : gsap.utils.toArray(element.children);
  
  return gsap.fromTo(
    chars,
    {
      opacity: 0,
      x: -20,
      skewX: 15,
      scale: 1.1,
    },
    {
      opacity: 1,
      x: 0,
      skewX: 0,
      scale: 1,
      stagger: 0.1,
      delay,
      duration: 0.7,
      ease: 'power3.out',
      clearProps: 'all',
    }
  );
};

// Rock band shake effect
export const rockShake = (element: string | Element, intensity: number = 10) => {
  return gsap.fromTo(
    element,
    { x: -intensity, rotation: -1 },
    {
      duration: 0.1,
      x: intensity,
      rotation: 1,
      repeat: 5,
      yoyo: true,
      ease: 'none',
      clearProps: 'all',
    }
  );
};

// Create a scroll-triggered animation
export const createScrollAnimation = (
  trigger: string | Element,
  target: string | Element,
  animation: (element: string | Element) => gsap.core.Tween,
  options = {}
) => {
  return ScrollTrigger.create({
    trigger,
    start: 'top 80%',
    end: 'bottom 20%',
    onEnter: () => animation(target),
    once: true,
    ...options,
  });
};

// Parallax effect
export const parallaxElement = (element: string | Element, speed: number = 0.5) => {
  return gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

// Distortion text effect (for headings)
export const distortionEffect = (element: string | Element) => {
  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    },
  });

  timeline
    .fromTo(
      element,
      { filter: 'blur(0px)', scale: 1 },
      { filter: 'blur(3px)', scale: 1.05, duration: 0.2 }
    )
    .to(element, { filter: 'blur(0px)', scale: 1, duration: 0.3 });

  return timeline;
};

// Image reveal animation
export const imageReveal = (element: string | Element) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  tl.fromTo(
    element,
    {
      clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
      scale: 1.1,
    },
    {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      scale: 1,
      duration: 1.2,
      ease: 'power3.inOut',
    }
  );

  return tl;
};

// Video section animation
export const videoSectionAnimation = (element: string | Element) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: 'top 70%',
      end: 'bottom 30%',
      toggleActions: 'play none none reverse',
    },
  });

  tl.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.9,
      boxShadow: '0 0 0 rgba(255, 0, 0, 0)',
    },
    {
      opacity: 1,
      scale: 1,
      boxShadow: '0 0 30px rgba(255, 0, 0, 0.3)',
      duration: 0.8,
      ease: 'power2.out',
    }
  );

  return tl;
};

// Glitch effect animation for band member cards
export const glitchEffect = (element: string | Element) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    onComplete: () => {
      // Add periodic glitch effect after initial animation
      const randomGlitch = () => {
        if (!document.body.contains(element instanceof Element ? element : document.querySelector(element as string))) {
          return; // Element no longer in DOM
        }
        
        const glitchTimeline = gsap.timeline();
        glitchTimeline
          .to(element, {
            skewX: () => gsap.utils.random(-15, 15),
            skewY: () => gsap.utils.random(-5, 5),
            filter: 'hue-rotate(90deg) saturate(1.5) brightness(1.2)',
            duration: 0.08,
            ease: 'power1.inOut',
          })
          .to(element, {
            skewX: 0,
            skewY: 0,
            filter: 'hue-rotate(0deg) saturate(1) brightness(1)',
            duration: 0.1,
            ease: 'power1.out',
          });
        
        // Schedule next random glitch
        gsap.delayedCall(gsap.utils.random(3, 8), randomGlitch);
      };
      
      // Start random glitches
      gsap.delayedCall(2, randomGlitch);
    }
  });
  
  // Initial animation
  tl.fromTo(
    element,
    {
      opacity: 0,
      x: () => gsap.utils.random(-50, 50),
      y: 50,
      rotation: () => gsap.utils.random(-10, 10),
      scale: 0.8,
      filter: 'blur(10px) hue-rotate(90deg)',
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      filter: 'blur(0px) hue-rotate(0deg)',
      duration: 0.8,
      ease: 'power3.out',
    }
  );
  
  return tl;
};

// Rock band member card entry animation
export const rockMemberEntry = (element: string | Element, index: number = 0) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
  
  tl.fromTo(
    element,
    {
      opacity: 0,
      y: 100,
      rotationY: -25,
      rotationX: 15,
      scale: 0.8,
      transformOrigin: 'center bottom',
      boxShadow: '0 0 0 rgba(242, 27, 7, 0)',
    },
    {
      opacity: 1,
      y: 0,
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      boxShadow: '0 15px 30px rgba(242, 27, 7, 0.4), 0 10px 10px rgba(5, 242, 219, 0.3)',
      duration: 0.8,
      delay: index * 0.2,
      ease: 'power3.out',
    }
  );
  
  // Add hover effect
  if (element instanceof Element) {
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        rotationY: 5,
        rotationX: -5,
        y: -10,
        scale: 1.05,
        boxShadow: '0 20px 40px rgba(242, 27, 7, 0.6), 0 15px 15px rgba(5, 242, 219, 0.4)',
        duration: 0.4,
        ease: 'power2.out',
      });
    });
    
    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        rotationY: 0,
        rotationX: 0,
        y: 0,
        scale: 1,
        boxShadow: '0 15px 30px rgba(242, 27, 7, 0.4), 0 10px 10px rgba(5, 242, 219, 0.3)',
        duration: 0.6,
        ease: 'power2.inOut',
      });
    });
  }
  
  return tl;
}; 