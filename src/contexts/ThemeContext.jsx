import React, { createContext, useState, useEffect, useCallback, useMemo, useContext } from 'react';

const ThemeContext = createContext(null);

function resolveInitialTheme() {
  const stored = localStorage.getItem('origen-theme');
  if (stored === 'dark' || stored === 'light') return stored;
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(resolveInitialTheme);


  /**
   * Side-effect: Mutates the DOM root element for global CSS variable cascading.
   * Persists user preference to mitigate layout shift (FOUC) on subsequent visits.
   */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('origen-theme', theme);
  }, [theme]);


  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      if (!localStorage.getItem('origen-theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);


  const value = useMemo(() => ({
    theme,
    isDark: theme === 'dark',
    toggleTheme,
  }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme debe usarse dentro de <ThemeProvider>');
  }
  return ctx;
}
