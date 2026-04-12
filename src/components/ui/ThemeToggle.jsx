import React from 'react';
import { useTheme } from '../../hooks/useTheme';

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
      id="theme-toggle"
    >
      <i className={`bi ${isDark ? 'bi-sun-fill' : 'bi-moon-fill'}`} aria-hidden="true" />
    </button>
  );
}

export default ThemeToggle;
