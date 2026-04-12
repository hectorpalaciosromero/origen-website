import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, BRAND } from '../../constants/data';
import ThemeToggle from '../ui/ThemeToggle';

const menuVariants = {
  closed: { height: 0, opacity: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
  open: { height: 'auto', opacity: 1, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
};

const linkVariants = {
  closed: { opacity: 0, x: -16 },
  open: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.04, duration: 0.3 },
  }),
};

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, [menuOpen]);

  const isActive = useCallback((to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  }, [location.pathname]);

  const toggleMenu = useCallback(() => setMenuOpen((p) => !p), []);


  const mobileLinks = NAV_LINKS.flatMap((item) => {
    const links = [{ ...item }];
    if (item.children) {
      item.children.forEach((child) => links.push({ ...child, isSub: true }));
    }
    return links;
  });

  return (
    <header className={`navbar-custom${scrolled ? ' scrolled' : ''}`} ref={navRef}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand-title" aria-label={`${BRAND.name} - Inicio`}>
          <i className="bi bi-fire brand-icon" aria-hidden="true" />
          {BRAND.name}
        </Link>

        <div className="navbar-right">
          <nav aria-label="Navegación principal">
            <ul className="navbar-links">
              {NAV_LINKS.map((item) =>
                item.children ? (
                  <li key={item.label} className="nav-dropdown">
                    <Link to={item.to} aria-haspopup="true" className={isActive(item.to) ? 'active-link' : ''}>
                      {item.label}{' '}
                      <i className="bi bi-chevron-down" style={{ fontSize: '0.7rem' }} />
                    </Link>
                    <ul className="nav-dropdown-menu" role="menu">
                      {item.children.map((child) => (
                        <li key={child.label} role="none">
                          <Link to={child.to} role="menuitem" className={isActive(child.to) ? 'active-link' : ''}>
                            <i className="bi bi-arrow-right-short" /> {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link to={item.to} className={isActive(item.to) ? 'active-link' : ''} aria-current={isActive(item.to) ? 'page' : undefined}>
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          <ThemeToggle />

          <button
            className={`hamburger-btn${menuOpen ? ' open' : ''}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>


      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>


      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            aria-label="Menú móvil"
          >
            {mobileLinks.map((link, i) => (
              <motion.div key={link.to + link.label} custom={i} variants={linkVariants} initial="closed" animate="open">
                <Link to={link.to} className={link.isSub ? 'mobile-sub' : ''}>
                  <i className={`bi ${link.icon}`} aria-hidden="true" />
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
