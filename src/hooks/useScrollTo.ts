import { useCallback } from 'react';
import { useSmoothScroll } from '../contexts/SmoothScrollContext';

/**
 * Hook for smooth scrolling to elements using Lenis
 */
export const useScrollTo = () => {
  const { lenis } = useSmoothScroll();

  /**
   * Scroll to a specific element with options
   * @param target Element or selector to scroll to
   * @param options Lenis scroll options
   */
  const scrollTo = useCallback(
    (
      target: string | HTMLElement | null,
      options?: {
        offset?: number;
        duration?: number;
        immediate?: boolean;
        easing?: (t: number) => number;
        lerp?: number;
        onComplete?: () => void;
      }
    ) => {
      if (!lenis) return;
      
      // If target is null, scroll to top
      if (!target) {
        lenis.scrollTo(0, options);
        return;
      }
      
      // If target is a string (selector), find the element
      if (typeof target === 'string') {
        const element = document.querySelector(target);
        if (!element) {
          console.warn(`Element with selector "${target}" not found.`);
          return;
        }
        
        lenis.scrollTo(element as HTMLElement, options);
        return;
      }
      
      // If target is an HTMLElement
      lenis.scrollTo(target, options);
    },
    [lenis]
  );

  return { scrollTo };
}; 