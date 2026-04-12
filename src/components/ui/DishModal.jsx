import React, { useEffect, useCallback, useRef } from 'react';

function DishModal({ dish, onClose, whatsapp }) {
  const modalRef = useRef(null);
  const previousFocus = useRef(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!dish) return;

    previousFocus.current = document.activeElement;
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      const closeBtn = modalRef.current?.querySelector('.dish-modal__close');
      closeBtn?.focus();
    });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previousFocus.current?.focus();
    };
  }, [dish, handleKeyDown]);

  if (!dish) return null;

  const orderUrl = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(
        `¡Hola! Me gustaría pedir: ${dish.name} (${dish.price}) 🍽️`
      )}`
    : null;

  return (
    <div
      className="dish-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalle de ${dish.name}`}
    >
      <div
        className="dish-modal"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <button
          className="dish-modal__close"
          onClick={onClose}
          aria-label="Cerrar detalle"
        >
          <i className="bi bi-x-lg" />
        </button>

        <img
          src={dish.img}
          alt={dish.name}
          className="dish-modal__img"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        <div className="dish-modal__body">
          <h3 className="dish-modal__name">{dish.name}</h3>
          <p className="dish-modal__desc">
            {dish.longDesc || dish.desc}
          </p>
          <div className="dish-modal__footer">
            <span className="dish-modal__price">{dish.price}</span>
            <span className="dish-modal__badge">
              <i className="bi bi-fire" aria-hidden="true" />
              Especialidad
            </span>
            {orderUrl && (
              <a
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="dish-modal__order-btn"
                aria-label={`Pedir ${dish.name} por WhatsApp`}
              >
                <i className="bi bi-whatsapp" aria-hidden="true" />
                Pedir
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DishModal;
