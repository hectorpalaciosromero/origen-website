import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '../../constants/data';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
  exit: (direction) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.25 },
  }),
};

function TestimonialSlider() {
  const [[active, direction], setActive] = useState([0, 1]);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef(null);

  const goTo = useCallback((idx, dir) => {
    setActive([idx, dir]);
  }, []);

  const next = useCallback(() => {
    goTo((active + 1) % TESTIMONIALS.length, 1);
  }, [active, goTo]);

  const prev = useCallback(() => {
    goTo((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length, -1);
  }, [active, goTo]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const handlePointerDown = useCallback((e) => { touchStart.current = e.clientX; }, []);
  const handlePointerUp = useCallback((e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    touchStart.current = null;
  }, [next, prev]);

  const testimonial = TESTIMONIALS[active];

  return (
    <section
      className="testimonials-section"
      aria-label="Testimonios de clientes"
      id="testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="testimonials-inner">
        <div className="section-header">
          <h3 className="section-header__title">Voces de Nuestros Comensales</h3>
          <div className="section-header__divider">
            <span className="section-header__icon">
              <i className="bi bi-chat-quote-fill" />
            </span>
          </div>
        </div>

        <div
          className="testimonial-stage"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          style={{ touchAction: 'pan-y' }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              className="testimonial-card"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <div className="testimonial-quote-icon" aria-hidden="true">
                <i className="bi bi-quote" />
              </div>
              <blockquote className="testimonial-text">
                "{testimonial.text}"
              </blockquote>
              <div className="testimonial-stars" aria-label={`${testimonial.rating} estrellas`}>
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <i key={i} className="bi bi-star-fill" aria-hidden="true" />
                ))}
              </div>
              <div className="testimonial-author">
                <span className="testimonial-avatar" aria-hidden="true">
                  {testimonial.avatar}
                </span>
                <div>
                  <strong className="testimonial-name">{testimonial.name}</strong>
                  <span className="testimonial-role">{testimonial.role}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="testimonial-dots" role="tablist" aria-label="Navegar testimonios">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={idx === active}
              className={`testimonial-dot${idx === active ? ' active' : ''}`}
              onClick={() => goTo(idx, idx > active ? 1 : -1)}
              aria-label={`Testimonio ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialSlider;
