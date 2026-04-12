import { useEffect, useRef } from 'react';


export function useScrollReveal({
  selector = '.reveal',
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px',
} = {}) {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [selector, threshold, rootMargin]);
}
