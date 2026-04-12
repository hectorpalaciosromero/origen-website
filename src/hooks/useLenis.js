import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Initializes and manages the Lenis smooth scroll instance.
 * Binds the exact RequestAnimationFrame (RAF) loop to the browser's refresh rate.
 * @see https://github.com/darkroomengineering/lenis
 */
export function useLenis() {
  useEffect(() => {
    // A11Y Compliance: Fallback to native scroll if OS user prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    window.lenis = lenis;

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);
}
