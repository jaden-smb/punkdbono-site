import { useEffect, useRef, RefCallback } from 'react';
import { useSmoothScroll } from '../../contexts/SmoothScrollContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { rockMemberEntry, glitchEffect, distortionEffect } from '../../utils/animations';
import './AboutPage.css';

/**
 * About page component with band information
 */
const AboutPage = () => {
  const { lenis } = useSmoothScroll();
  const pageHeaderRef = useRef<HTMLDivElement>(null);
  const bandSectionRef = useRef<HTMLElement>(null);
  const bandSectionTitleRef = useRef<HTMLHeadingElement>(null);
  const memberRefs = useRef<Array<HTMLDivElement | null>>([]);
  const imageSectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const nameRefs = useRef<Array<HTMLHeadingElement | null>>([]);
  
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
      role: 'Cantante', // Singer in Spanish
      image: '/images/members/Juan-Camilo.jpg'
    },
    {
      id: 2,
      name: 'Luisa',
      role: 'Guitarrista', // Guitarist in Spanish
      image: '/images/members/Luisa.jpg'
    },
    {
      id: 3,
      name: 'Daniel',
      role: 'Bajista', // Bassist in Spanish
      image: '/images/members/Daniel.jpg'
    }
  ];
  
  // Reset refs arrays
  useEffect(() => {
    memberRefs.current = memberRefs.current.slice(0, bandMembers.length);
    imageSectionRefs.current = imageSectionRefs.current.slice(0, bandMembers.length);
    nameRefs.current = nameRefs.current.slice(0, bandMembers.length);
  }, [bandMembers.length]);
  
  // Initialize animations
  useEffect(() => {
    if (!lenis) return;
    
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
    
    // Refresh ScrollTrigger when animations are set up
    ScrollTrigger.refresh();
    
    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [lenis]);
  
  return (
    <div className="about-page">
      <div className="page-header" ref={pageHeaderRef}>
        <h1>About PunkD'Bono</h1>
      </div>
      
      <section className="band-members" ref={bandSectionRef}>
        <h2 ref={bandSectionTitleRef}>Meet The Band</h2>
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