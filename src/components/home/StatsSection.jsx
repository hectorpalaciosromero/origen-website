import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { STATS } from '../../constants/data';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function AnimatedCounter({ value, suffix, duration = 2000, shouldAnimate }) {
  const prefersReduced = useReducedMotion();
  const [count, setCount] = useState(prefersReduced ? value : 0);

  useEffect(() => {
    if (!shouldAnimate || prefersReduced) {
      setCount(value);
      return;
    }

    let startTime = null;
    let rafId;

    function tick(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setCount(value);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [shouldAnimate, value, duration, prefersReduced]);

  const formatted = count >= 1000
    ? `${(count / 1000).toFixed(count >= value ? 0 : 1)}k`
    : count.toLocaleString('es-PE');

  return <span className="stat-number">{formatted}{suffix}</span>;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};


function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="stats-section" aria-label="Nuestros números" id="stats">
      <motion.div
        ref={ref}
        className="stats-inner"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {STATS.map((stat) => (
          <motion.div key={stat.label} className="stat-item" variants={itemVariants}>
            <i className={`bi ${stat.icon} stat-icon`} aria-hidden="true" />
            <AnimatedCounter value={stat.value} suffix={stat.suffix} shouldAnimate={isInView} />
            <span className="stat-label">{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default StatsSection;
