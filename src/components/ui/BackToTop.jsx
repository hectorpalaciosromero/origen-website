import React, { useState, useEffect, useCallback } from 'react';

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <button
      className={`back-to-top${visible ? ' visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Volver arriba"
      title="Volver arriba"
      id="back-to-top"
    >
      <i className="bi bi-chevron-up" aria-hidden="true" />
    </button>
  );
}

export default BackToTop;
