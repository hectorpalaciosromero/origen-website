import React from 'react';

import { HERO_SLIDES, BRAND } from '../../constants/data';

function HeroCarousel() {
  return (
    <section className="hero-carousel" aria-label="Banner principal" id="hero">

      <div className="hero-noise" aria-hidden="true" />


      <div className="hero-overlay">
        <p className="hero-tagline">
          <i className="bi bi-star-fill" aria-hidden="true" /> Alta Cocina Peruana de Autor{' '}
          <i className="bi bi-star-fill" aria-hidden="true" />
        </p>
        <h1 className="hero-brand">{BRAND.name}</h1>
        <div className="hero-accent-line" aria-hidden="true" />
        <p className="hero-subtitle">
          {BRAND.tagline}
        </p>
        <a href="#carta" className="hero-cta">
          <i className="bi bi-journal-richtext" aria-hidden="true" />
          Explorar La Mesa de Autor
        </a>
      </div>


      <div className="hero-scroll-indicator" aria-hidden="true">
        <span className="text">Scroll</span>
        <div className="track" />
      </div>


      <div
        id="heroCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        <div className="carousel-inner">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.src}
              className={`carousel-item${idx === 0 ? ' active' : ''}`}
              data-bs-interval={slide.interval}
            >
              <img
                src={slide.src}
                className="d-block w-100"
                alt={slide.alt}
                loading={idx === 0 ? 'eager' : 'lazy'}
                fetchpriority={idx === 0 ? 'high' : undefined}
                decoding={idx === 0 ? 'sync' : 'async'}
              />
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
          aria-label="Diapositiva anterior"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
          aria-label="Siguiente diapositiva"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

export default HeroCarousel;
