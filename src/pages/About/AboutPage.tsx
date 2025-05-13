import { useEffect, useRef, RefCallback, useState } from 'react';
import { useSmoothScroll } from '../../contexts/SmoothScrollContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { rockMemberEntry, glitchEffect, distortionEffect } from '../../utils/animations';
import cenizaImage from '/images/illustrations/cenizapunk.png';
import calacaImage from '/images/illustrations/calaca.png';
import bajoImage from '/images/illustrations/bajo.png';
import './AboutPage.css';

/**
 * About page component with band information
 */
const AboutPage = () => {
  const { lenis, refresh } = useSmoothScroll();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pageHeaderRef = useRef<HTMLDivElement>(null);
  const bandDescriptionRef = useRef<HTMLParagraphElement>(null);
  const bandSectionRef = useRef<HTMLElement>(null);
  const bandSectionTitleRef = useRef<HTMLHeadingElement>(null);
  const memberRefs = useRef<Array<HTMLDivElement | null>>([]);
  const imageSectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const nameRefs = useRef<Array<HTMLHeadingElement | null>>([]);
  const cenizaRef = useRef<HTMLImageElement>(null);
  const calacaRef = useRef<HTMLImageElement>(null);
  const bajoRef = useRef<HTMLImageElement>(null);
  
  // Create ref callbacks
  const setMemberRef: (index: number) => RefCallback<HTMLDivElement> = (index) => (el) => {
    memberRefs.current[index] = el;
  };
  
  const setImageSectionRef: (index: number) => RefCallback<HTMLDivElement> = (index) => (el) => {
    imageSectionRefs.current[index] = el;
  };
  
  const setNameRef: (index: number) => RefCallback<HTMLHeadingElement> = (index) => (el) => {
    nameRefs.current[index] = el;
  };
  
  const bandMembers = [
    {
      id: 1,
      name: 'Juan Camilo',
      role: 'Cantante', 
      image: '/images/members/Juan-Camilo.jpg'
    },
    {
      id: 2,
      name: 'Luisa',
      role: 'Guitarrista', 
      image: '/images/members/Luisa.jpg'
    },
    {
      id: 3,
      name: 'Daniel',
      role: 'Bajista', 
      image: '/images/members/Daniel.jpg'
    }
  ];
  
  // Reset refs arrays
  useEffect(() => {
    memberRefs.current = memberRefs.current.slice(0, bandMembers.length);
    imageSectionRefs.current = imageSectionRefs.current.slice(0, bandMembers.length);
    nameRefs.current = nameRefs.current.slice(0, bandMembers.length);
  }, [bandMembers.length]);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Initialize animations
  useEffect(() => {
    if (!lenis) return;
    
    // Ensure everything is properly loaded before initializing animations
    const initTimeout = setTimeout(() => {
      // Refresh ScrollTrigger and Lenis to ensure proper initialization
      refresh();
      
      // Header animation
      if (pageHeaderRef.current) {
        gsap.fromTo(
          pageHeaderRef.current.querySelector('h1'),
          { 
            opacity: 0, 
            y: -50, 
            scale: 1.2,
            filter: 'blur(10px)'
          },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.out'
          }
        );
      }
      
      // Band description animation - slightly delayed after header
      if (bandDescriptionRef.current) {
        gsap.fromTo(
          bandDescriptionRef.current,
          { 
            opacity: 0, 
            y: 30, 
            scale: 0.95,
            filter: 'blur(8px)'
          },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.2,
            delay: 0.3,
            ease: 'power2.out'
          }
        );

        // Add periodic glitch effect to the band description
        const setupGlitchEffect = () => {
          const randomTime = gsap.utils.random(5, 12);
          gsap.delayedCall(randomTime, () => {
            if (!document.body.contains(bandDescriptionRef.current)) return;
            
            gsap.timeline()
              .to(bandDescriptionRef.current, {
                duration: 0.1,
                skewX: () => gsap.utils.random(-5, 5),
                filter: 'blur(2px) hue-rotate(45deg)',
                ease: 'none',
              })
              .to(bandDescriptionRef.current, {
                duration: 0.1,
                skewX: 0,
                filter: 'blur(0px) hue-rotate(0deg)',
                ease: 'none',
                onComplete: setupGlitchEffect
              });
          });
        };
        
        setupGlitchEffect();
      }
      
      // Band section title animation
      if (bandSectionTitleRef.current) {
        distortionEffect(bandSectionTitleRef.current);
      }
      
      // Animate member cards with staggered delay
      memberRefs.current.forEach((card, index) => {
        if (card) {
          rockMemberEntry(card, index);
        }
      });
      
      // Glitch effect on member images
      imageSectionRefs.current.forEach((imgSection, index) => {
        if (imgSection) {
          // Delay the glitch effects to make them appear more random
          setTimeout(() => {
            glitchEffect(imgSection);
          }, index * 300);
        }
      });
      
      // Text reveal for names
      nameRefs.current.forEach((name, index) => {
        if (name) {
          ScrollTrigger.create({
            trigger: name,
            start: 'top 90%',
            onEnter: () => {
              gsap.fromTo(
                name,
                { 
                  opacity: 0, 
                  x: index % 2 === 0 ? -30 : 30,
                  filter: 'blur(5px)'
                },
                { 
                  opacity: 1, 
                  x: 0,
                  filter: 'blur(0px)',
                  duration: 0.6,
                  delay: 0.1 + (index * 0.1),
                  ease: 'back.out(1.7)'
                }
              );
            },
            once: true
          });
        }
      });
      
      // Enhanced glitch effect for each member card as user scrolls
      memberRefs.current.forEach((card, index) => {
        if (card) {
          // Set initial state
          gsap.set(card, { 
            opacity: 0,
            y: 50,
            filter: 'blur(10px) hue-rotate(90deg)',
            scale: 0.9,
            skewX: () => gsap.utils.random(-10, 10) 
          });
          
          // Create scroll trigger for each card
          ScrollTrigger.create({
            trigger: card,
            start: 'top 80%',
            onEnter: () => {
              // Create glitch timeline
              const glitchTl = gsap.timeline();
              
              // Initial glitch effect
              glitchTl
                // First quick glitch
                .to(card, {
                  opacity: 0.4,
                  duration: 0.1,
                  skewX: 20,
                  skewY: 5,
                  scale: 1.05,
                  filter: 'blur(4px) hue-rotate(120deg) brightness(1.5)',
                  ease: 'power1.inOut',
                })
                // Second quick glitch
                .to(card, {
                  opacity: 0.7,
                  duration: 0.1,
                  skewX: -15,
                  skewY: -3,
                  scale: 0.95,
                  filter: 'blur(2px) hue-rotate(-90deg) contrast(1.5)',
                  ease: 'power1.inOut',
                })
                // Third quick glitch
                .to(card, {
                  opacity: 0.6,
                  duration: 0.1,
                  skewX: 7,
                  skewY: -4,
                  scale: 1.02,
                  filter: 'blur(6px) hue-rotate(45deg) saturate(1.5)',
                  ease: 'power1.inOut',
                })
                // Final reveal
                .to(card, {
                  opacity: 1,
                  duration: 0.3,
                  skewX: 0,
                  skewY: 0,
                  scale: 1,
                  filter: 'blur(0px) hue-rotate(0deg) contrast(1) brightness(1) saturate(1)',
                  ease: 'power2.out',
                });
              
              // Apply glitch effect to the image section after card appears
              if (imageSectionRefs.current[index]) {
                glitchEffect(imageSectionRefs.current[index]!);
              }
              
              // Reveal member name with a glitch effect
              if (nameRefs.current[index]) {
                gsap.fromTo(
                  nameRefs.current[index]!,
                  { 
                    opacity: 0, 
                    x: index % 2 === 0 ? -20 : 20,
                    skewX: index % 2 === 0 ? 15 : -15,
                    filter: 'blur(5px)'
                  },
                  { 
                    opacity: 1, 
                    x: 0,
                    skewX: 0,
                    filter: 'blur(0px)',
                    duration: 0.5,
                    delay: 0.3,
                    ease: 'back.out(1.7)'
                  }
                );
              }
              
              // Periodic random glitches for card after initial animation
              const setupRandomGlitches = () => {
                const randomTime = gsap.utils.random(3, 8);
                gsap.delayedCall(randomTime, () => {
                  if (!document.body.contains(card)) return;
                  
                  // Random glitch animation
                  gsap.timeline()
                    .to(card, {
                      duration: 0.1,
                      opacity: 0.8,
                      skewX: () => gsap.utils.random(-8, 8),
                      skewY: () => gsap.utils.random(-3, 3),
                      scale: () => gsap.utils.random(0.98, 1.02),
                      filter: 'hue-rotate(90deg) contrast(1.2)',
                      ease: 'none',
                    })
                    .to(card, {
                      duration: 0.1,
                      opacity: 1,
                      skewX: 0,
                      skewY: 0,
                      scale: 1,
                      filter: 'hue-rotate(0deg) contrast(1)',
                      ease: 'none',
                      onComplete: setupRandomGlitches
                    });
                });
              };
              
              // Start random glitches after the initial animation
              setupRandomGlitches();
            },
            once: true
          });
        }
      });
      
      // Animate illustrations
      if (cenizaRef.current) {
        gsap.fromTo(
          cenizaRef.current,
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
        gsap.to(cenizaRef.current, {
          y: -10,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        });
      }

      if (calacaRef.current) {
        gsap.fromTo(
          calacaRef.current,
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
        gsap.to(calacaRef.current, {
          y: -15,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        });
      }

      if (bajoRef.current) {
        gsap.fromTo(
          bajoRef.current,
          {
            opacity: 0,
            x: 0,
            y: 100,
            rotation: 0,
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
            delay: 0.7
          }
        );

        // Add floating animation with different timing
        gsap.to(bajoRef.current, {
          y: -12,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        });
      }
      
      // Refresh ScrollTrigger when animations are set up
      ScrollTrigger.refresh();
      setIsInitialized(true);
    }, 200); // Add a slight delay to ensure everything is loaded
    
    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ScrollTrigger.clearScrollMemory();
    };
  }, [lenis, refresh]);
  
  // Add a window resize handler to refresh ScrollTrigger
  useEffect(() => {
    if (!isInitialized) return;
    
    const handleResize = () => {
      refresh();
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isInitialized, refresh]);
  
  return (
    <div className="about-page">
      <div className="page-header" ref={pageHeaderRef}>
        <h1>About PunkD'Bono</h1>
        
        {/* Add Ceniza illustration */}
        <img 
          ref={cenizaRef}
          src={cenizaImage} 
          alt="Ceniza Punk" 
          className="about-illustration ceniza"
          style={{
            top: isMobile ? '343px' : '300px',
            left: isMobile ? '-9px' : '-60px',
            width: isMobile ? '250px' : '250px',
            zIndex: 100,
            pointerEvents: 'none',
            transform: isMobile ? 'scale(0.8)' : 'scale(1)',
            transition: 'all 0.1s ease-in-out',
            opacity: 0.9
          }}
        />
        
        <p className="band-description" ref={bandDescriptionRef}>
          Somos un grupo de desgraciados que se supone que hace música, nuestro sonido es una combinación de Punk, Metal y Ska, hablamos de lo que se nos da la gana y esperamos que ustedes se contagien de nuestras putridas canciones.
        </p>
      </div>
      
      <section className="band-members" ref={bandSectionRef}>
        <h2 ref={bandSectionTitleRef}>Meet The Band</h2>
        
        {/* Add Calaca illustration */}
        <img 
          ref={calacaRef}
          src={calacaImage} 
          alt="Calaca" 
          className="about-illustration calaca"
          style={{
            position: 'absolute',
            top: isMobile ? '40%' : '50%',
            right: isMobile ? '10px' : '30px',
            width: isMobile ? '130px' : '230px',
            zIndex: 10,
            pointerEvents: 'none',
            transform: isMobile ? 'scale(0.8)' : 'scale(1)',
            transition: 'all 0.3s ease-in-out'
          }}
        />
        
        {/* Add Bajo illustration */}
        <img 
          ref={bajoRef}
          src={bajoImage} 
          alt="Bajo" 
          className="about-illustration bajo"
          style={{
            position: 'absolute',
            bottom: isMobile ? '10px' : '30px',
            left: isMobile ? '10px' : '30px',
            width: isMobile ? '140px' : '240px',
            zIndex: 10,
            pointerEvents: 'none',
            transform: isMobile ? 'scale(0.8)' : 'scale(1)',
            transition: 'all 0.3s ease-in-out'
          }}
        />
        
        <div className="band-section-container">
          <div className="members-grid">
            {bandMembers.map((member, index) => (
              <div 
                className="member-card member-card-3d" 
                key={member.id}
                ref={setMemberRef(index)}
              >
                <div 
                  className="member-image"
                  ref={setImageSectionRef(index)}
                >
                  <img src={member.image} alt={member.name} className="member-photo-3d" />
                </div>
                <div className="member-info">
                  <h3 ref={setNameRef(index)}>{member.name}</h3>
                  <h4>{member.role}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;