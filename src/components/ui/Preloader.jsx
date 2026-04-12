import React, { useState, useEffect } from 'react';

function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1600);
    const hideTimer = setTimeout(() => setHidden(true), 2200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className={`preloader${fadeOut ? ' preloader--fade' : ''}`} aria-hidden="true">
      <div className="preloader__content">
        <span className="preloader__icon">
          <i className="bi bi-fire" />
        </span>
        <h2 className="preloader__brand">ORIGEN</h2>
        <p className="preloader__tagline">Alta Cocina Peruana de Autor</p>
        <div className="preloader__bar">
          <div className="preloader__bar-fill" />
        </div>
      </div>
    </div>
  );
}

export default Preloader;
