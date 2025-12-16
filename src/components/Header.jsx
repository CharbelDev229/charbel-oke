import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import cvFile from '../assets/CV_OKE.pdf';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          {/* Logo */}
          <a href="#" className="logo">Portfolio.</a>

          {/* Desktop navigation */}
          <nav className="nav">
            <ul className="nav-list">
              <li><a href="#hero">{t.nav.home}</a></li>
              <li><a href="#about">{t.nav.about}</a></li>
              <li><a href="#skills">Compétences</a></li>
              <li><a href="#services">{t.nav.services}</a></li>
              <li><a href="#portfolio">{t.nav.portfolio}</a></li>
              <li><a href="#contact">{t.nav.contact}</a></li>
              <li>
                <a href={cvFile} download className="nav-btn">{t.nav.cv}</a>
              </li>
              <li>
                <button onClick={toggleLanguage} className="lang-btn">
                  {language.toUpperCase()}
                </button>
              </li>
              <li><ThemeToggle /></li>
            </ul>
          </nav>

          {/* Burger button (mobile) */}
          <button
            className="burger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <a onClick={() => setMenuOpen(false)} href="#hero">{t.nav.home}</a>
        <a onClick={() => setMenuOpen(false)} href="#about">{t.nav.about}</a>
        <a onClick={() => setMenuOpen(false)} href="#skills">Compétences</a>
        <a onClick={() => setMenuOpen(false)} href="#services">{t.nav.services}</a>
        <a onClick={() => setMenuOpen(false)} href="#portfolio">{t.nav.portfolio}</a>
        <a onClick={() => setMenuOpen(false)} href="#contact">{t.nav.contact}</a>

        <a href={cvFile} download className="mobile-cv">📄 {t.nav.cv}</a>

        <button onClick={toggleLanguage} className="lang-btn">
          {language.toUpperCase()}
        </button>

        <ThemeToggle />
      </div>

      {/* Styles */}
      <style>{`
        .header {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          padding: 15px 0;
          transition: 0.3s;
        }

        .header.scrolled {
          background: rgba(10,10,10,0.8);
          backdrop-filter: blur(10px);
          padding: 10px 0;
        }

        [data-theme="light"] .header.scrolled {
          background: rgba(255,255,255,0.9);
        }

        /* Replaces .container to avoid global conflicts */
        .header-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex; /* FORCE FLEX ROW */
          flex-direction: row; /* FORCE ROW */
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .logo {
          font-size: 1.8rem;
          font-weight: 700;
          background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          white-space: nowrap;
        }

        .nav-list {
          display: flex;
          gap: 20px;
          align-items: center;
          margin: 0;
          padding: 0;
        }

        .nav-list a {
          position: relative;
          opacity: 0.8;
          text-decoration: none; /* Ensure no underline issues */
        }

        .nav-list a:hover {
          opacity: 1;
          color: var(--primary-color);
        }

        .nav-btn {
          padding: 8px 16px;
          border: 1px solid var(--primary-color);
          border-radius: 20px;
          color: var(--primary-color);
          text-decoration: none;
        }

        .lang-btn {
          border: 1px solid var(--glass-border);
          background: transparent;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
        }

        /* Burger */
        .burger {
          display: none;
          font-size: 2rem;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-color);
        }

        /* Mobile menu */
        .mobile-menu {
          position: fixed;
          inset: 0;
          background: rgba(5, 5, 5, 0.98); /* Deep dark for dark mode */
          backdrop-filter: blur(15px);
          display: flex;
          flex-direction: column;
          gap: 30px; /* More spacing for wider tap targets */
          padding: 100px 40px;
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 999;
          overflow-y: auto;
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        /* Light Mode Mobile Menu */
        [data-theme="light"] .mobile-menu {
           background: rgba(255, 255, 255, 0.98);
           color: #0f172a;
        }

        .mobile-menu a,
        .mobile-menu button {
          font-size: 1.5rem; /* Larger text for mobile */
          font-weight: 600;
          color: var(--text-color);
          background: none;
          border: none;
          text-align: left;
          padding: 10px 0; /* Larger tap area */
          border-bottom: 1px solid rgba(255,255,255,0.05); /* Separators */
        }
        
        [data-theme="light"] .mobile-menu a,
        [data-theme="light"] .mobile-menu button {
            color: #0f172a;
            border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .mobile-menu a:hover,
        .mobile-menu button:hover {
            color: var(--primary-color);
            padding-left: 10px; /* Slide effect on hover */
            transition: all 0.2s ease;
        }

        @media (max-width: 768px) {
          .nav { display: none; }
          .burger { display: block; }
        }
      `}</style>
    </>
  );
};

export default Header;
