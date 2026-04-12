import React, { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const EXPERIENCE_ITEMS = [
  {
    src: `${process.env.PUBLIC_URL}/about-interior.jpg`,
    title: 'El Santuario',
    desc: 'Cada rincón diseñado para suspender el tiempo',
  },
  {
    src: `${process.env.PUBLIC_URL}/hero-ceviche.jpg`,
    title: 'Ceviche Nikkei',
    desc: 'El océano en estado puro',
  },
  {
    src: `${process.env.PUBLIC_URL}/about-chefs.jpg`,
    title: 'La Brigada',
    desc: 'Precisión quirúrgica, pasión ancestral',
  },
  {
    src: `${process.env.PUBLIC_URL}/menu-causa.png`,
    title: 'Causa de Autor',
    desc: 'Escultura efímera del terruño',
  },
  {
    src: `${process.env.PUBLIC_URL}/about-ambience.jpg`,
    title: 'Noches de ORIGEN',
    desc: 'Donde cada velada es irrepetible',
  },
  {
    src: `${process.env.PUBLIC_URL}/hero-lomo.jpg`,
    title: 'Fuego Vivo',
    desc: 'La danza ancestral del wok',
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  }),
};

function GalleryGrid() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });


  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [40, -40]);


  const isDown = useRef(false);
  const isHovered = useRef(false);
  const startX = useRef(0);
  const scrollPos = useRef(0);


  /**
   * Continuous animation loop for the infinite marquee effect.
   * Resets the track scroll position to 0 exactly when the first set of items
   * is out of view, creating a seamless infinite scroll experience.
   * Bound to RAF to ensure 60fps hardware-accelerated painting.
   */
  useEffect(() => {
    let animationId;
    const play = () => {
      if (scrollRef.current && !isDown.current && !isHovered.current) {
        scrollRef.current.style.scrollSnapType = 'none';
        scrollRef.current.scrollLeft += 1;
        

        const track = scrollRef.current;
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(play);
    };
    animationId = requestAnimationFrame(play);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const onMouseDown = (e) => {
    isDown.current = true;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grabbing';
      scrollRef.current.style.scrollSnapType = 'none';
      startX.current = e.pageX - scrollRef.current.offsetLeft;
      scrollPos.current = scrollRef.current.scrollLeft;
    }
  };

  const onMouseLeave = () => {
    isDown.current = false;
    isHovered.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  const onMouseUp = () => {
    isDown.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  const onMouseMove = (e) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollPos.current - walk;
  };

  return (
    <section
      className="experience-section"
      ref={sectionRef}
      aria-label="Experiencia visual"
      id="galeria"
    >

      <div className="experience-header">
        <motion.span
          className="experience-eyebrow"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <i className="bi bi-camera-reels" aria-hidden="true" /> Tras Bambalinas
        </motion.span>
        <motion.h2
          className="experience-title"
          style={{ y: titleY }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          La Experiencia ORIGEN
        </motion.h2>
        <motion.p
          className="experience-subtitle"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Un viaje sensorial contado en cada detalle
        </motion.p>
      </div>


      <div className="experience-track-wrapper">
        <div 
          className="experience-track" 
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          onMouseEnter={() => { isHovered.current = true; }}
          onTouchStart={() => { isHovered.current = true; }}
          onTouchEnd={() => { isHovered.current = false; }}
        >

          {[...EXPERIENCE_ITEMS, ...EXPERIENCE_ITEMS].map((item, i) => (
            <motion.article
              key={i}
              className="experience-card"
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <div className="experience-card__img-wrap">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  draggable={false}
                />
                <div className="experience-card__vignette" aria-hidden="true" />
              </div>
              <div className="experience-card__caption">
                <h3 className="experience-card__title">{item.title}</h3>
                <p className="experience-card__desc">{item.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GalleryGrid;
