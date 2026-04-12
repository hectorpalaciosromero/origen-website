import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_CATEGORIES, BRAND } from '../../constants/data';
import SectionHeader from '../ui/SectionHeader';
import DishModal from '../ui/DishModal';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
};

function Carta() {
  const [activeTab, setActiveTab] = useState('entradas');
  const [selectedDish, setSelectedDish] = useState(null);

  const currentCategory = MENU_CATEGORIES.find((c) => c.id === activeTab);

  const handleTabChange = useCallback((tabId) => {
    if (tabId === activeTab) return;
    setActiveTab(tabId);
  }, [activeTab]);

  const openDish = useCallback((item) => setSelectedDish(item), []);
  const closeDish = useCallback(() => setSelectedDish(null), []);

  return (
    <section className="carta-section" id="carta">
      <div className="page-header">
        <h2>La Mesa de Autor</h2>
        <p>Curaduría estacional del terruño peruano</p>
      </div>

      <div className="carta-content">

        <div className="carta-tabs" role="tablist" aria-label="Categorías del menú">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeTab === cat.id}
              className={`carta-tab${activeTab === cat.id ? ' active' : ''}`}
              onClick={() => handleTabChange(cat.id)}
              id={`tab-${cat.id}`}
            >
              <i className={`bi ${cat.icon}`} aria-hidden="true" />
              {cat.label}
            </button>
          ))}
        </div>

        <SectionHeader title={currentCategory.label} />


        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="carta-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            aria-live="polite"
          >
            {currentCategory.items.map((item) => (
              <motion.article
                key={item.name}
                className="carta-card"
                variants={cardVariants}
                whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(139,26,26,0.18)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openDish(item)}
                tabIndex={0}
                role="button"
                aria-label={`Ver detalle de ${item.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openDish(item);
                  }
                }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="carta-card-img"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="carta-card-body">
                  <h4 className="carta-card-name">{item.name}</h4>
                  <p className="carta-card-desc">{item.desc}</p>
                  <div className="carta-card-footer">
                    <span className="carta-card-price">{item.price}</span>
                    <span className="carta-card-peek">
                      Ver detalle <i className="bi bi-arrow-right" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <DishModal dish={selectedDish} onClose={closeDish} whatsapp={BRAND.whatsapp} />
    </section>
  );
}

export default Carta;
