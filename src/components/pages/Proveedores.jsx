import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SUPPLIERS } from '../../constants/data';
import SectionHeader from '../ui/SectionHeader';

const CardLayer = ({ supplier, i, progress, range, targetScale }) => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.8, 1]);

  const scale = useTransform(progress, range, [1, targetScale]);

  const topOffset = `calc(15vh + ${i * 4}vh)`; 

  return (
    <div ref={containerRef} className="stack-layer-container">
      <motion.div 
        className="stack-layer"
        style={{
          scale,
          top: topOffset,
        }}
      >
        <div className="stack-card">

          <div className="stack-card__img-wrap">
            <motion.div className="stack-card__img-inner" style={{ scale: imageScale }}>
              <img src={supplier.img} alt={supplier.title} loading="lazy" />
            </motion.div>
          </div>
          

          <div className="stack-card__content">
            <span className="stack-badge">
              <i className={`bi ${supplier.regionIcon}`} aria-hidden="true" />
              {supplier.region}
            </span>
            <h2 className="stack-title">{supplier.title}</h2>
            <div className="stack-divider" />
            <p className="stack-desc">{supplier.text}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

function Proveedores() {
  const containerRef = useRef(null);


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <div className="stack-page">

      <div className="page-header">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Productores Locales
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Una red de comercio justo y respeto mutuo
        </motion.p>
      </div>

      <section className="stack-section">
        <SectionHeader title="La Trazabilidad del Sabor" />

        <div ref={containerRef} className="stack-container">
          {SUPPLIERS.map((supplier, i) => {

            const targetScale = 1 - ((SUPPLIERS.length - i) * 0.05);
            return (
              <CardLayer 
                key={supplier.id}
                i={i}
                supplier={supplier}
                progress={scrollYProgress}
                range={[i * 0.33, 1]} 
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Proveedores;
