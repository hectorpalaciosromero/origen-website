import React, { useState } from 'react';
import ReservationModal from './ReservationModal';

function WhatsAppButton() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="whatsapp-float"
        aria-label="Contactar por WhatsApp"
        id="whatsapp-button"
        onClick={() => setModalOpen(true)}
      >
        <i className="bi bi-calendar2-check" aria-hidden="true" />
        <span className="whatsapp-float__tooltip">Solicitar Reserva</span>
      </button>

      <ReservationModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default WhatsAppButton;
