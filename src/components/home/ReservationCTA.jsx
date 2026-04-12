import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import ReservationModal from '../ui/ReservationModal';

function ReservationCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [isModalOpen, setModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <>
      <section className="reservation-cta" aria-label="Reservar mesa" id="reservar">
        <div className="reservation-cta__noise" aria-hidden="true" />

        <motion.div
          ref={ref}
          className="reservation-cta__inner"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.span className="reservation-cta__eyebrow" variants={itemVariants}>
            <i className="bi bi-gem" aria-hidden="true" /> Experiencia Exclusiva
          </motion.span>

          <motion.h2 className="reservation-cta__title" variants={itemVariants}>
            Reserve Su Próxima Velada
          </motion.h2>

          <motion.p className="reservation-cta__subtitle" variants={itemVariants}>
            Permítanos diseñar una experiencia irrepetible para usted y sus acompañantes.
            Cada noche en ORIGEN es una obra que no se repite.
          </motion.p>

          <motion.div className="reservation-cta__actions" variants={itemVariants}>
            <Link to="/contacto" className="btn-outline">
              Ver Información
            </Link>
            <button 
              type="button"
              className="btn-solid"
              onClick={() => setModalOpen(true)}
            >
              <i className="bi bi-calendar2-check" aria-hidden="true" />
              Solicitar Reserva
            </button>
          </motion.div>
        </motion.div>
      </section>

      <ReservationModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default ReservationCTA;
