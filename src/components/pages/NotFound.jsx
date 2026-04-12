import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BRAND } from '../../constants/data';
import PageTransition from '../ui/PageTransition';

function NotFound() {
  return (
    <PageTransition>
      <section className="not-found" aria-label="Página no encontrada">
        <motion.div
          className="not-found__inner"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="not-found__code">404</span>
          <h1 className="not-found__title">
            Esta página no existe en nuestro universo culinario
          </h1>
          <p className="not-found__subtitle">
            Quizás el plato que busca aún no ha sido creado por nuestros chefs,
            o tal vez la dirección ha cambiado de temporada.
          </p>
          <div className="not-found__actions">
            <Link to="/" className="not-found__btn">
              <i className="bi bi-house-door" aria-hidden="true" />
              Volver al Inicio
            </Link>
            <Link to="/contacto" className="not-found__btn-secondary">
              <i className="bi bi-calendar-check" aria-hidden="true" />
              Hacer una Reserva
            </Link>
          </div>
          <p className="not-found__brand">{BRAND.name}</p>
        </motion.div>
      </section>
    </PageTransition>
  );
}

export default NotFound;
