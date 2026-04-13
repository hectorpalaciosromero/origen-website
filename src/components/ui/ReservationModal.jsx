import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND } from '../../constants/data';

const TIME_SLOTS = [
  {
    label: 'Almuerzo',
    icon: 'bi-brightness-high',
    slots: [
      { value: '11:30', display: '11:30 AM' },
      { value: '12:00', display: '12:00 PM' },
      { value: '12:30', display: '12:30 PM' },
      { value: '13:00', display: '1:00 PM' },
      { value: '13:30', display: '1:30 PM' },
      { value: '14:00', display: '2:00 PM' },
      { value: '14:30', display: '2:30 PM' },
      { value: '15:00', display: '3:00 PM' },
    ],
  },
  {
    label: 'Tarde',
    icon: 'bi-sunset',
    slots: [
      { value: '15:30', display: '3:30 PM' },
      { value: '16:00', display: '4:00 PM' },
      { value: '16:30', display: '4:30 PM' },
      { value: '17:00', display: '5:00 PM' },
      { value: '17:30', display: '5:30 PM' },
    ],
  },
  {
    label: 'Cena',
    icon: 'bi-moon-stars',
    slots: [
      { value: '18:00', display: '6:00 PM' },
      { value: '18:30', display: '6:30 PM' },
      { value: '19:00', display: '7:00 PM' },
      { value: '19:30', display: '7:30 PM' },
      { value: '20:00', display: '8:00 PM' },
      { value: '20:30', display: '8:30 PM' },
      { value: '21:00', display: '9:00 PM' },
      { value: '21:30', display: '9:30 PM' },
      { value: '22:00', display: '10:00 PM' },
      { value: '22:30', display: '10:30 PM' },
      { value: '23:00', display: '11:00 PM' },
      { value: '23:30', display: '11:30 PM' },
    ],
  },
];

function ReservationModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pax: '',
    date: '',
    time: '',
    timeDisplay: '',
    name: '',
    occasion: 'Ninguna',
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData({ pax: '', date: '', time: '', timeDisplay: '', name: '', occasion: 'Ninguna' });
      document.body.style.overflow = 'hidden';
      
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));
  const handlePax = (n) => { setFormData({ ...formData, pax: n }); handleNext(); };

  const handleTimeSelect = (value, display) => {
    setFormData({ ...formData, time: value, timeDisplay: display });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    const lines = [
      `Hola, soy *${formData.name}*.`,
      `Solicito una reserva VIP en ORIGEN:`,
      ``,
      `- Personas: *${formData.pax}*`,
      `- Fecha: *${formData.date}*`,
      `- Hora: *${formData.timeDisplay}*`,
      `- Ocasion: *${formData.occasion}*`,
      ``,
      `Quedo atento a la confirmacion.`,
    ];

    const url = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const isStep2Valid = formData.date !== '' && formData.time !== '';
  
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  return (
    <AnimatePresence>
      <motion.div
        className="reservation-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="presentation"
      >
        <motion.div
          className="reservation-modal"
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <button className="reservation-modal__close" onClick={onClose} aria-label="Cerrar modal de reserva">
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>

          <header className="reservation-modal__header">
            <span className="reservation-modal__eyebrow">Conserjería de Reserva</span>
            <h2 id="modal-title" className="reservation-modal__title">Su Mesa en ORIGEN</h2>
            <div className="reservation-modal__progress" aria-hidden="true">
              <div className={`progress-dot ${step >= 1 ? 'active' : ''}`} />
              <div className="progress-line" />
              <div className={`progress-dot ${step >= 2 ? 'active' : ''}`} />
              <div className="progress-line" />
              <div className={`progress-dot ${step >= 3 ? 'active' : ''}`} />
            </div>
          </header>

          <div className="reservation-modal__body">
            {step === 1 && (
              <motion.div className="step-content" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <h3>¿Para cuántas almas prepararemos la experiencia?</h3>
                <div className="pax-grid" role="group" aria-label="Selección de número de personas">
                  {[1, 2, 3, 4, 5, 6, 7, '8+'].map((n) => (
                    <button 
                      key={n} 
                      type="button" 
                      className={`pax-btn ${formData.pax === n ? 'selected' : ''}`} 
                      onClick={() => handlePax(n)}
                      aria-pressed={formData.pax === n}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div className="step-content" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <h3>¿Cuándo desea acompañarnos?</h3>
                <div className="form-group" style={{ marginTop: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                  <label htmlFor="res-date">Día de Reserva</label>
                  <input 
                    id="res-date"
                    type="date" 
                    min={minDate} 
                    value={formData.date} 
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
                    required 
                  />
                </div>

                <div className="time-slots-wrapper" role="group" aria-label="Selección de horario">
                  {TIME_SLOTS.map((group) => (
                    <div className="time-slot-group" key={group.label}>
                      <div className="time-slot-group__label">
                        <i className={`bi ${group.icon}`} aria-hidden="true" />
                        <span>{group.label}</span>
                      </div>
                      <div className="time-slot-grid">
                        {group.slots.map((slot) => (
                          <button
                            key={slot.value}
                            type="button"
                            className={`time-slot-btn ${formData.time === slot.value ? 'selected' : ''}`}
                            onClick={() => handleTimeSelect(slot.value, slot.display)}
                            aria-pressed={formData.time === slot.value}
                          >
                            {slot.display}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-outline" onClick={handlePrev}>Volver</button>
                  <button type="button" className="btn-solid" disabled={!isStep2Valid} onClick={handleNext}>Continuar</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div className="step-content" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <h3>A nombre de quién estará el cuidado</h3>
                <form onSubmit={handleBooking} className="final-form">
                  <div className="form-group">
                    <label htmlFor="res-name">Su Nombre Completo</label>
                    <input 
                      id="res-name"
                      type="text" 
                      placeholder="Ej. Hector Palacios" 
                      value={formData.name} 
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="res-occasion">¿Motivo Especial?</label>
                    <select 
                      id="res-occasion"
                      value={formData.occasion} 
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    >
                      <option value="Ninguna">Cena Regular</option>
                      <option value="Aniversario">Aniversario / Romance</option>
                      <option value="Cumpleaños">Cumpleaños</option>
                      <option value="Negocios">Cena de Negocios</option>
                    </select>
                  </div>
                  <div className="modal-actions">
                    <button type="button" className="btn-outline" onClick={handlePrev}>Volver</button>
                    <button type="submit" className="btn-solid btn-pulse">
                      <i className="bi bi-whatsapp" aria-hidden="true" /> Solicitar Reserva
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ReservationModal;
