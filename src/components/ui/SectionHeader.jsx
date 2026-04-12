import React from 'react';

function SectionHeader({ title, className = '' }) {
  return (
    <div className={`section-header ${className}`}>
      <h3 className="section-header__title">{title}</h3>
      <div className="section-header__divider">
        <span className="section-header__icon">
          <i className="bi bi-diamond-fill" />
        </span>
      </div>
    </div>
  );
}

export default SectionHeader;
