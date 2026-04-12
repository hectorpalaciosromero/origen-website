import React, { useReducer, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOCATIONS } from '../../constants/data';
import SectionHeader from '../ui/SectionHeader';

const initialFormState = {
  values: { name: '', email: '', message: '' },
  errors: {},
  status: 'idle',
};

/**
 * State machine reducer for form handling.
 * Isolates complex UI state transitions (idle -> sending -> sent -> error) 
 * into predictable, deterministic mutations.
 * 
 * @param {Object} state - The current snapshot of the form state.
 * @param {Object} action - The dispatched action object containing type and payload.
 */
function formReducer(state, action) {
  switch (action.type) {
    case 'field_change':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: '' },
      };
    case 'set_errors':
      return { ...state, errors: action.errors };
    case 'submit':
      return { ...state, status: 'sending' };
    case 'success':
      return { ...state, status: 'sent' };
    case 'reset':
      return initialFormState;
    default:
      return state;
  }
}

function validateForm(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Por favor ingresa tu nombre de reserva.';
  if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'E-mail no válido.';
  }
  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = 'Por favor, haznos saber más de tus requerimientos (mínimo 10 caracteres).';
  }
  return errors;
}

function Contacto() {
  const [form, dispatch] = useReducer(formReducer, initialFormState);

  const handleChange = useCallback((e) => {
    dispatch({ type: 'field_change', field: e.target.name, value: e.target.value });
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const errors = validateForm(form.values);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'set_errors', errors });
      return;
    }
    dispatch({ type: 'submit' });
    setTimeout(() => {
      dispatch({ type: 'success' });
    }, 1800);
  }, [form.values]);

  const handleReset = useCallback(() => {
    dispatch({ type: 'reset' });
  }, []);

  const blockVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.8, ease: 'easeOut' },
    }),
  };

  return (
    <div className="concierge-page">

      <div className="page-header">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Servicio de Concierge
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Trascendemos el servicio. Diseñamos noches irremplazables.
        </motion.p>
      </div>

      <section className="concierge-section">

        <SectionHeader title="Santuarios en Lima" />

        <div className="concierge-grid">
          {LOCATIONS.map((loc, idx) => (
            <motion.article
              key={loc.id}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={blockVariants}
              className="concierge-card"
            >

              <div className="concierge-map-wrapper">
                <iframe
                  src={loc.mapSrc}
                  title={`Mapa geodésico de ${loc.name}`}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="concierge-map-iframe"
                />
                <div className="concierge-map-overlay" />
              </div>

              <div className="concierge-card-body">
                <h4 className="concierge-card-name">
                  <i className="bi bi-geo-alt-fill" aria-hidden="true" />
                  {loc.name}
                </h4>
                <div className="concierge-card-divider" />
                <p className="concierge-inforow">
                  <i className="bi bi-signpost-fill" aria-hidden="true" />
                  {loc.address}
                </p>
                <p className="concierge-inforow concierge-inforow--phone">
                  <i className="bi bi-telephone-fill" aria-hidden="true" />
                  {loc.phone}
                </p>
                {loc.hours && (
                  <p className="concierge-inforow concierge-inforow--hours">
                    <i className="bi bi-clock-fill" aria-hidden="true" />
                    {loc.hours}
                  </p>
                )}
                <p className="concierge-card-desc">{loc.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>


        <motion.div
          className="concierge-form-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={blockVariants}
          custom={1}
        >
          <div className="concierge-form-wrapper">
            <AnimatePresence mode="wait">
              {form.status === 'sent' ? (
                <motion.div
                  key="success"
                  className="boutique-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="boutique-success__icon-wrap">
                    <i className="bi bi-check2-all" aria-hidden="true" />
                  </div>
                  <h4>Mesa Reservada Virtualmente</h4>
                  <p>Iniciaremos el protocolo de confirmación. Nuestro Maître d'hôtel se pondrá en contacto pronto.</p>
                  <button className="btn-secondary-custom" onClick={handleReset}>
                    Nueva Petición
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="boutique-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="boutique-form__header">
                    <h3>Petición de Visita</h3>
                    <p>Déjenos conocer los detalles para preparar la velada correcta.</p>
                  </div>

                  <div className={`boutique-input-group ${form.errors.name ? 'has-error' : ''}`}>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.values.name}
                      onChange={handleChange}
                      placeholder=" "
                      autoComplete="name"
                    />
                    <label htmlFor="name">Su Nomenclatura Completa</label>
                    <div className="boutique-input-line" />
                    {form.errors.name && <span className="boutique-error">{form.errors.name}</span>}
                  </div>

                  <div className={`boutique-input-group ${form.errors.email ? 'has-error' : ''}`}>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.values.email}
                      onChange={handleChange}
                      placeholder=" "
                      autoComplete="email"
                    />
                    <label htmlFor="email">Correspondencia Digital (Email)</label>
                    <div className="boutique-input-line" />
                    {form.errors.email && <span className="boutique-error">{form.errors.email}</span>}
                  </div>

                  <div className={`boutique-input-group boutique-input-group--textarea ${form.errors.message ? 'has-error' : ''}`}>
                    <textarea
                      id="message"
                      name="message"
                      value={form.values.message}
                      onChange={handleChange}
                      placeholder=" "
                      rows={3}
                    />
                    <label htmlFor="message">Dietas, Alergias o Motivo de Aniversario</label>
                    <div className="boutique-input-line" />
                    <span className="boutique-char-count">{form.values.message.length}/500</span>
                    {form.errors.message && <span className="boutique-error">{form.errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    className="boutique-btn-submit"
                    disabled={form.status === 'sending'}
                  >
                    {form.status === 'sending' ? (
                      <span>
                        <i className="bi bi-hourglass-split boutique-spin" /> Procesando
                      </span>
                    ) : (
                      <span>
                        Sellar Petición <i className="bi bi-arrow-right" />
                      </span>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default Contacto;
