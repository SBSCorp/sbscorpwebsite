import { useEffect, useRef } from 'react';

/**
 * Custom hook to handle scroll-based animations
 * Applies the 'is-visible' class to elements with 'animate-on-scroll' class when they enter the viewport
 */
export const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.15, // When 15% of the element is visible
      }
    );
    
    // Select all elements with animation class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));
    
    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  
  return ref;
};

export default useScrollAnimation;