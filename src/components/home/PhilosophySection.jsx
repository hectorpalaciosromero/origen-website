import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const PILLARS = [
  {
    icon: 'bi-fire',
    title: 'Fuego',
    desc: 'Técnica ancestral con visión contemporánea. Cada llama cuenta una historia milenaria.',
    accent: '#C8860A',
  },
  {
    icon: 'bi-globe-americas',
    title: 'Tierra',
    desc: '100% trazabilidad directa con productores locales de los 3 pisos ecológicos del Perú.',
    accent: '#6B8E23',
  },
  {
    icon: 'bi-droplet-half',
    title: 'Agua',
    desc: 'Del Pacífico a los ríos andinos: frescura absoluta en cada ingrediente marino y fluvial.',
    accent: '#4A90D9',
  },
  {
    icon: 'bi-gem',
    title: 'Esencia',
    desc: 'Respeto incondicional por la materia prima. Sin artificios, sin atajos, sin concesiones.',
    accent: '#C8860A',
  },
];

const STATS = [
  { value: 15, suffix: '+', label: 'Años de trayectoria' },
  { value: 48, suffix: '', label: 'Productores aliados' },
  { value: 100, suffix: '%', label: 'Ingredientes nacionales' },
];

function PhilosophySection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const img2Y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="phil" ref={sectionRef} aria-label="Filosofía" id="filosofia">

      <div className="phil__line" aria-hidden="true" />

      <div className="phil__grid">

        <div className="phil__gallery">
          <motion.div className="phil__img phil__img--main" style={{ y: imgY }}>
            <img
              src={`${process.env.PUBLIC_URL}/about-prep.jpg`}
              alt="Chef emplatando con precisión quirúrgica"
              loading="lazy"
            />
            <div className="phil__img-overlay" aria-hidden="true" />
          </motion.div>

          <motion.div className="phil__img phil__img--accent" style={{ y: img2Y }}>
            <img
              src={`${process.env.PUBLIC_URL}/about-interior.jpg`}
              alt="Interior del restaurante ORIGEN"
              loading="lazy"
            />
          </motion.div>


          <motion.div
            className="phil__badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5, ease: 'backOut' }}
          >
            <span className="phil__badge-number">
              <AnimatedCounter target={15} suffix="+" />
            </span>
            <span className="phil__badge-label">Años de<br />Excelencia</span>
          </motion.div>
        </div>


        <motion.div
          className="phil__content"
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ y: textY }}
        >
          <motion.span className="phil__eyebrow" variants={fadeUp}>
            <i className="bi bi-heart-pulse" aria-hidden="true" /> Nuestra Filosofía
          </motion.span>

          <motion.h2 className="phil__title" variants={fadeUp}>
            Cada plato tiene un <em>origen</em>
          </motion.h2>

          <motion.div className="phil__divider" variants={fadeUp} aria-hidden="true">
            <span />
          </motion.div>

          <motion.p className="phil__lead" variants={fadeUp}>
            Creemos que la cocina es un acto de antropología viva.
            Cada ingrediente narra la historia de una tierra, de una mano campesina,
            de un saber que viaja por generaciones hasta llegar a su plato.
          </motion.p>


          <motion.div className="phil__stats" variants={fadeUp}>
            {STATS.map((s, i) => (
              <div key={i} className="phil__stat">
                <span className="phil__stat-value">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </span>
                <span className="phil__stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>


          <motion.div className="phil__pillars" variants={fadeUp}>
            {PILLARS.map((p, i) => (
              <motion.div
                key={i}
                className="phil__pillar"
                whileHover={{ y: -6, boxShadow: `0 12px 32px ${p.accent}22` }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="phil__pillar-icon" style={{ '--pillar-accent': p.accent }}>
                  <i className={`bi ${p.icon}`} aria-hidden="true" />
                </div>
                <div className="phil__pillar-text">
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.a
            href="#carta"
            className="phil__cta"
            variants={fadeUp}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Descubrir La Mesa <i className="bi bi-arrow-right" aria-hidden="true" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default PhilosophySection;
