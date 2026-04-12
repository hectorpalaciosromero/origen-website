import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import HeroCarousel from './components/home/HeroCarousel';
import Carta from './components/home/Carta';
import StatsSection from './components/home/StatsSection';
import PhilosophySection from './components/home/PhilosophySection';
import ReservationCTA from './components/home/ReservationCTA';

import WhatsAppButton from './components/ui/WhatsAppButton';
import BackToTop from './components/ui/BackToTop';
import ScrollProgress from './components/ui/ScrollProgress';
import ErrorBoundary from './components/ui/ErrorBoundary';
import PageTransition from './components/ui/PageTransition';
import Preloader from './components/ui/Preloader';

import { useLenis } from './hooks/useLenis';

const QuienesSomos = lazy(() => import('./components/pages/QuienesSomos'));
const Productos = lazy(() => import('./components/pages/Productos'));
const Proveedores = lazy(() => import('./components/pages/Proveedores'));
const Contacto = lazy(() => import('./components/pages/Contacto'));
const NotFound = lazy(() => import('./components/pages/NotFound'));

const GalleryGrid = lazy(() => import('./components/home/GalleryGrid'));
const TestimonialSlider = lazy(() => import('./components/home/TestimonialSlider'));

function RouteFallback() {
  return (
    <div className="route-fallback" aria-busy="true" aria-label="Cargando contenido">
      <div className="route-fallback__spinner">
        <i className="bi bi-fire" aria-hidden="true" />
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <PageTransition>
      <HeroCarousel />
      <StatsSection />
      <PhilosophySection />
      <Carta />
      <Suspense fallback={<div style={{height: '500px'}} />}>
        <GalleryGrid />
        <TestimonialSlider />
      </Suspense>
      <ReservationCTA />
    </PageTransition>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" onExitComplete={() => {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    }}>
      <Suspense fallback={<RouteFallback />} key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/carta" element={<HomePage />} />
          <Route path="/quienes-somos" element={<PageTransition><QuienesSomos /></PageTransition>} />
          <Route path="/productos" element={<PageTransition><Productos /></PageTransition>} />
          <Route path="/proveedores" element={<PageTransition><Proveedores /></PageTransition>} />
          <Route path="/contacto" element={<PageTransition><Contacto /></PageTransition>} />
          <Route path="/quienesomos" element={<Navigate to="/quienes-somos" replace />} />
          <Route path="/Carta" element={<Navigate to="/carta" replace />} />
          <Route path="/Proveedores" element={<Navigate to="/proveedores" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  useLenis();

  return (
    <Router>
      <div className="App">
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>

        <Preloader />
        <ScrollProgress />
        <Navbar />

        <main id="main-content">
          <ErrorBoundary>
            <AnimatedRoutes />
          </ErrorBoundary>
        </main>

        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
