import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { REGION_PRODUCTS } from '../../constants/data';
import SectionHeader from '../ui/SectionHeader';

function Productos() {
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    const isMobile = window.innerWidth <= 900;
    if (isMobile) setActiveIndex(-1);
  }, []);

  return (
    <div className="eco-page">

      <div className="page-header">
        <h2>La Experiencia</h2>
        <p>Un recorrido por los pisos altitudinales de nuestra tierra</p>
      </div>

      <section className="eco-section">
        <SectionHeader title="Tres Ecosistemas Ancestrales" />

        <div className="eco-accordion" role="list">
          {REGION_PRODUCTS.map((product, idx) => {
            const isActive = activeIndex === idx;

            return (
              <motion.article
                key={product.id}
                role="button"
                tabIndex={0}

                layout
                animate={{
                  flex: isActive ? 2.5 : 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 25,
                  mass: 0.8
                }}
                className={`eco-card ${isActive ? 'is-active' : ''}`}
                onMouseEnter={() => window.innerWidth > 900 && setActiveIndex(idx)}
                onMouseLeave={() => window.innerWidth > 900 && setActiveIndex(1)}
                onClick={() => setActiveIndex(isActive ? -1 : idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveIndex(isActive ? -1 : idx);
                  }
                }}
                aria-expanded={isActive}
              >

                <div className="eco-card__bg">
                  <motion.img
                    src={product.img}
                    alt={product.title}
                    loading="lazy"
                    animate={{
                      scale: isActive ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className={`eco-card__overlay ${isActive ? 'is-darker' : ''}`} />
                </div>


                <div className="eco-card__content">

                  <motion.span className="eco-card__badge" layout>
                    <i className={`bi ${product.badgeIcon}`} aria-hidden="true" />
                    {product.badge}
                  </motion.span>

                  <motion.h3 className="eco-card__title" layout>
                    {product.title}
                  </motion.h3>


                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="eco-card__details"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                        transition={{ delay: 0.15, duration: 0.4 }}
                      >
                        <p>{product.excerpt}</p>

                        <ul className="eco-card__list">
                          {product.highlights.map((item, i) => (
                            <motion.li
                              key={item}
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.25 + i * 0.1, duration: 0.3 }}
                            >
                              <i className="bi bi-check2-circle" aria-hidden="true" />
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Productos;
