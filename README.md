# ORIGEN — Alta Cocina Peruana

Sitio web del restaurante ORIGEN (San Isidro, Lima). SPA construida con React 18, Framer Motion y un sistema de diseño propio en Vanilla CSS. El proyecto cubre el ciclo completo de frontend: arquitectura de componentes, gestión de estado, animaciones a 60fps, accesibilidad WCAG 2.1 AA y SEO técnico.

---

## Stack

| | Tecnología | Versión |
|---|---|---|
| Framework | React | 18.3 |
| Routing | React Router DOM | 6.26 |
| Animaciones | Framer Motion | 12.38 |
| Smooth scroll | Lenis | 1.3 |
| Estilos | Vanilla CSS + Custom Properties | — |
| SEO estructurado | JSON-LD (Schema.org) | — |
| Iconografía | Bootstrap Icons | 1.11 |

---

## Arquitectura del proyecto

```
src/
├── App.js                     # Composición raíz: router, Suspense boundaries, Lenis
├── components/
│   ├── home/                  # Secciones del homepage
│   │   ├── HeroCarousel       # Bootstrap carousel + overlay de gradiente + scroll indicator
│   │   ├── StatsSection       # Contadores con easing cúbico + useReducedMotion
│   │   ├── PhilosophySection  # Layout editorial con parallax de múltiples capas
│   │   ├── Carta              # Menú tabbed + grid animado con stagger + DishModal
│   │   ├── GalleryGrid        # Scroll horizontal infinito vía rAF loop (sin librería)
│   │   ├── TestimonialSlider  # Slider con dirección de swipe y autoplay pausable
│   │   └── ReservationCTA     # CTA con modal de reserva multi-paso
│   ├── layout/
│   │   ├── Navbar             # Glassmorphism + dropdown + hamburger responsive
│   │   ├── Footer             # JSON-LD embebido + grid asimétrico + tipografía colosal
│   │   └── ScrollToTop        # Reset de scroll por cambio de ruta
│   ├── pages/                 # Todas lazy-loaded con React.lazy()
│   │   ├── QuienesSomos       # Narrativa editorial zig-zag con InView stagger por bloque
│   │   ├── Productos          # Accordion flex con spring physics (Framer Motion layout)
│   │   ├── Proveedores        # Tarjetas apilables sticky con scale proporcional al scroll
│   │   ├── Contacto           # Formulario con useReducer + floating labels CSS puro
│   │   └── NotFound           # 404 de marca
│   └── ui/
│       ├── DishModal          # Focus trap completo + restore focus + Escape handler
│       ├── ReservationModal   # Wizard 3 pasos → WhatsApp deeplink con estado formateado
│       ├── Preloader          # Animación de entrada con barra de progreso CSS
│       ├── ScrollProgress     # Barra de lectura con useScroll de Framer Motion
│       ├── WhatsAppButton     # Botón flotante con tooltip y mensaje pre-armado
│       ├── BackToTop          # Aparece condicionalmente al hacer scroll
│       ├── ThemeToggle        # Switch claro/oscuro conectado al contexto global
│       ├── PageTransition     # Wrapper de AnimatePresence para fade entre rutas
│       ├── SectionHeader      # Encabezado reutilizable con divider de marca
│       └── ErrorBoundary      # Class component para captura de errores en runtime
├── contexts/
│   └── ThemeContext           # Estado global del tema con localStorage y matchMedia listener
├── hooks/
│   ├── useLenis               # Instancia Lenis con cleanup y check de prefers-reduced-motion
│   ├── useMediaQuery          # Wrapper reactivo sobre window.matchMedia()
│   ├── useReducedMotion       # Compuesto sobre useMediaQuery — consultado antes de animar
│   ├── useScrollReveal        # IntersectionObserver con auto-unobserve tras entrada
│   └── useTheme               # Re-export de retrocompatibilidad desde ThemeContext
├── constants/
│   └── data.js                # Única fuente de verdad: menú, sedes, redes, copy de marca
└── styles/
    ├── tokens.css             # Variables CSS, reset, keyframes, print, reduced-motion
    └── main.css               # Todos los componentes, responsive 360→1920px, dark overrides
```

---

## Decisiones técnicas

### Rendimiento

**GPU offloading** — Los elementos con animaciones pesadas (carrusel de galería, modales, preloader) tienen `will-change: transform, opacity`, `transform: translateZ(0)` y `backface-visibility: hidden`. Esto evita que el navegador los recomponga en el main thread.

**Aislamiento de layout (contain)** — Las secciones de mayor carga visual (`StatsSection`, `PhilosophySection`, `Carta`, `GalleryGrid`) tienen `contain: content`. Los cambios internos de esas secciones no desencadenan reflows en el resto del documento.

**Code splitting** — Todas las rutas y los dos componentes más pesados del homepage (`GalleryGrid`, `TestimonialSlider`) se cargan con `React.lazy()`. El usuario descarga solo lo que necesita en el momento inicial.

**LCP optimizado** — El `<head>` incluye `<link rel="preload" fetchpriority="high">` sobre la imagen del Hero para que el navegador la empiece a descargar antes de procesar el JavaScript.

**IntersectionObserver en lugar de scroll listeners** — `useScrollReveal` usa la API nativa `IntersectionObserver` con `unobserve` inmediato tras la primera entrada. No hay ningún listener activo sobre el evento `scroll` del documento.

### Scroll horizontal infinito (GalleryGrid)

El carrusel de galería no usa ninguna librería externa. Los items se duplican en el DOM (`[...items, ...items]`). Un loop `requestAnimationFrame` avanza `scrollLeft += 1` en cada frame. Cuando `scrollLeft >= scrollWidth / 2` se hace reset a `0`: el usuario no percibe el salto porque en ese punto está mirando el inicio del segundo set, que es visualmente idéntico al primero. El loop se pausa en hover y durante drag.

### Dark Mode

La resolución del tema inicial sigue esta cascada: `localStorage` → `prefers-color-scheme` → fallback `light`. Un segundo `useEffect` en `ThemeContext` escucha cambios de `matchMedia('prefers-color-scheme')` en tiempo real y solo los aplica si el usuario no tiene ninguna preferencia guardada en `localStorage`. El `value` del contexto está memorizado con `useMemo` para evitar re-renders en todos los consumers cuando cambia algo no relacionado.

El override de dark mode en CSS opera sobre un selector de atributo `[data-theme="dark"]` aplicado al `<html>`. Hay ~40 tokens redefinidos: superficies, texto, bordes, sombras, gradient del hero, glassmorphism y noise opacity. No hay ningún valor de color hardcodeado dentro de los componentes.

### Accesibilidad

- Skip link hacia `#main-content` visible al recibir foco (teclado).
- `DishModal` implementa focus trap completo: ciclo de Tab/Shift+Tab dentro del modal, cierre con Escape, y restauración del foco al elemento que abrió el modal al desmontar.
- `Carta` usa `role="tablist"`, `role="tab"`, `aria-selected` y `aria-live="polite"` en el panel de contenido.
- `TestimonialSlider` tiene dots con `role="tablist"`, `role="tab"` y `aria-selected`.
- Todos los íconos decorativos tienen `aria-hidden="true"`.
- `prefers-reduced-motion: reduce` desactiva todas las animaciones CSS y detiene la instancia de Lenis antes de crearla.

### SEO técnico

- JSON-LD de tipo `Restaurant` (Schema.org) inyectado directamente en el Footer con `dangerouslySetInnerHTML`.
- Open Graph + Twitter Cards en `index.html`.
- `<link rel="canonical">` con la URL de producción.
- `<meta name="robots" content="index, follow, max-image-preview:large">`.
- Todos los iframes de Google Maps tienen `loading="lazy"` y `referrerPolicy="no-referrer-when-downgrade"`.

### Formulario de contacto (useReducer)

`Contacto.jsx` usa `useReducer` en lugar de múltiples `useState` independientes. El reducer maneja cinco acciones: `field_change`, `set_errors`, `submit`, `success`, `reset`. La validación corre sobre el estado acumulado antes del dispatch de `submit`, por lo que nunca se envía en estado inválido. Los floating labels son CSS puro con `:placeholder-shown` y el selector de hermano adyacente `~`.

---

## Correr el proyecto

```bash
npm install && npm start
```

---

Arquitectura y Desarrollo por **Hector Palacios**
