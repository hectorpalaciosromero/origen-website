import React from 'react';
import { Link } from 'react-router-dom';
import { QUICK_LINKS, SOCIAL_LINKS, BRAND } from '../../constants/data';

function Footer() {
  return (
    <footer className="footer-monumental">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Restaurant',
            name: BRAND.name,
            description: BRAND.tagline,
            servesCuisine: 'Peruana',
            priceRange: '$$',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Av. Santo Toribio 173',
              addressLocality: 'San Isidro',
              addressRegion: 'Lima',
              addressCountry: 'PE',
            },
            telephone: '+51987789987',
            url: 'https://origen-restaurant.pe',
            image: `${process.env.PUBLIC_URL}/hero-ceviche.jpg`,
          }),
        }}
      />

      <div className="footer-m-inner">
        

        <div className="footer-m-grid">
          

          <div className="footer-m-brand-col">
            <h3 className="footer-m-logo">
              <i className="bi bi-fire" aria-hidden="true" />
              {BRAND.name}
            </h3>
            <p className="footer-m-slogan">
              {BRAND.shortTagline}. Exploramos la memoria gustativa de los Andes y la Costa, moldeando el futuro de nuestra gastronomía.
            </p>
            <div className="footer-m-socials">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="social-magnet"
                >
                  <i className={`bi ${s.icon}`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>


          <div className="footer-m-nav-col">
            <h4 className="footer-m-heading">Rutas</h4>
            <ul className="footer-m-links">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>
                    <span className="link-text">{link.label}</span>
                    <i className="bi bi-arrow-right-short link-arrow" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          <div className="footer-m-contact-col">
            <h4 className="footer-m-heading">Conserjería</h4>
            <div className="footer-m-address">
              <p>Av. Santo Toribio 173, San Isidro</p>
              <p>Av. Los Conquistadores 1200</p>
              <p>Calle Miguel Dasso 160</p>
            </div>
            <a href="tel:+51987789987" className="footer-m-phone">
              +51 987 789 987
            </a>
            <p className="footer-m-email">reservas@origen-restaurant.pe</p>
          </div>

        </div>


        <div className="footer-m-colossal">
          <span className="colossal-text">ORIGEN</span>
        </div>


        <div className="footer-m-bottom">
          <p>© {BRAND.year} {BRAND.name}. Reservados todos los derechos del diseño y concepto.</p>
          <p className="footer-m-author">
            Dirección Digital &bull; <span>{BRAND.author}</span>
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
