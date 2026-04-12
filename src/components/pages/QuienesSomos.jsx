import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PILLARS, BRAND } from '../../constants/data';
import SectionHeader from '../ui/SectionHeader';

function StoryBlock({ title, text, img, isReversed, eyebrow, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: delay } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  const imgVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: isReversed ? -2 : 2 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.div
      ref={ref}
      className={`story-block ${isReversed ? 'story-block--reversed' : ''}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="story-block__content">
        {eyebrow && (
          <motion.span className="story-block__eyebrow" variants={itemVariants}>
            <i className={`bi ${eyebrow.icon}`} aria-hidden="true" /> {eyebrow.text}
          </motion.span>
        )}
        <motion.h3 className="story-block__title" variants={itemVariants}>
          {title}
        </motion.h3>
        <motion.div className="story-block__divider" variants={itemVariants}><span/></motion.div>
        {text.map((paragraph, i) => (
          <motion.p key={i} className="story-block__text" variants={itemVariants}>
            {paragraph}
          </motion.p>
        ))}
      </div>

      <motion.div className="story-block__img-wrapper" variants={imgVariants}>
        <div className="story-block__img-inner">
          <img src={img} alt={title} loading="lazy" />
          <div className="story-block__img-overlay" />
        </div>
      </motion.div>
    </motion.div>
  );
}

function QuienesSomos() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <div className="story-page">

      <motion.header
        ref={headerRef}
        className="story-hero"
        initial="hidden"
        animate={isHeaderInView ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        <div className="story-hero__content">
          <motion.h1 variants={fadeUp}>El Manifiesto<br/><em>{BRAND.name}</em></motion.h1>
          <motion.p variants={fadeUp}>
            Un santuario donde la milenaria tradición culinaria peruana rinde tributo a la alta gastronomía contemporánea. No somos un restaurante, somos un viaje.
          </motion.p>
        </div>
        <motion.div className="story-hero__bg" variants={{
          hidden: { scale: 1.1, opacity: 0 },
          visible: { scale: 1, opacity: 1, transition: { duration: 1.5, ease: 'easeOut' } }
        }}>
          <img src={`${process.env.PUBLIC_URL}/hero-main.png`} alt="Mesa servida con elegancia" />
          <div className="story-hero__gradient" />
        </motion.div>
      </motion.header>


      <section className="story-body" aria-label="Nuestra Historia">
        <div className="story-container">
          <StoryBlock
            title="Nuestro Legado"
            eyebrow={{ icon: 'bi-book-half', text: 'El Comienzo' }}
            text={[
              `${BRAND.name} surge de una obstinación: rescatar las memorias de nuestras cordilleras, costas y selvas antes de que el mundo moderno las disipe.`,
              'Intervenimos lo mínimo necesario, permitiendo que cada recetario ancestral, heredado de generación en generación, encuentre un lienzo digno en nuestras mesas. Iniciamos este viaje prometiendo lealtad extrema al terruño sudamericano.'
            ]}
            img={`${process.env.PUBLIC_URL}/about-interior.jpg`}
            isReversed={false}
          />

          <StoryBlock
            title="Filosofía Purista"
            eyebrow={{ icon: 'bi-compass-fill', text: 'La Búsqueda' }}
            text={[
              'Consideramos que el acto de comer es el vínculo más primitivo y sagrado entre el hombre y su entorno natural.',
              'Nos desvelamos estudiando la estacionalidad de nuestros ingredientes, colaborando codo a codo con las comunidades originarias y empleando técnicas de extracción purista. Nuestro propósito último es elevar el ingrediente en peligro de extinción y convertirlo en una joya invaluable para el paladar.'
            ]}
            img={`${process.env.PUBLIC_URL}/about-prep.jpg`}
            isReversed={true}
          />

          <StoryBlock
            title="Los Artesanos"
            eyebrow={{ icon: 'bi-people-fill', text: 'La Brigada' }}
            text={[
              'Más que chefs, contamos con curadores y botánicos culinarios de primer nivel. Una élite de especialistas encabezada por obsesivos de la técnica y la perfección estética.',
              'Desde el trato milimétrico del cuchillo japonés sobre un pescado recién capturado en el Pacífico, hasta las cocciones exactas a presión que requiere un tubérculo andino extremo; nuestro equipo orquesta cada noche una sinfonía silenciosa de la que usted es el principal invitado de honor.'
            ]}
            img={`${process.env.PUBLIC_URL}/about-chefs.jpg`}
            isReversed={false}
          />
        </div>
      </section>


      <section className="story-pillars-section">
        <SectionHeader title="Los Fundamentos" />
        <div className="story-pillars">
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              className="story-pillar-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, borderColor: 'var(--color-secondary)' }}
            >
              <i className={`bi ${pillar.icon}`} aria-hidden="true" />
              <h4>{pillar.title}</h4>
              <p>{pillar.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default QuienesSomos;
