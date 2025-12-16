import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="hero">
      {/* Grid Background is handled globally in body, but we can add a spotlight effect here */}
      <div className="hero-spotlight"></div>

      <div className="container hero-content">
        <div className="badge-wrapper animate-fade-in">
          <span className="availability-badge">
            <span className="dot"></span> Available for work
          </span>
        </div>

        <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {t.hero.title_start} <br />
          <span className="highlight-text">{t.hero.title_end}</span>
        </h1>

        <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {t.hero.subtitle}
        </p>

        <div className="hero-cta animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <a href="#portfolio" className="btn">{t.hero.cta_projects}</a>
          <a href="#contact" className="btn btn-outline">{t.hero.cta_contact}</a>
        </div>
      </div>

      <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding-top: 80px;
          overflow: hidden;
        }
        
        .hero-spotlight {
          position: absolute;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
          filter: blur(80px);
          z-index: 0;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 900px;
        }

        .badge-wrapper {
          margin-bottom: 30px;
        }
        .availability-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: rgba(59, 130, 246, 0.08);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 50px;
          font-size: 0.85rem;
          color: var(--primary-color);
          font-weight: 500;
        }
        .dot {
          width: 8px;
          height: 8px;
          background: var(--primary-color);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--primary-color);
          animation: pulse 2s infinite;
        }

        .hero-title {
          font-size: 4.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          line-height: 1.1;
          letter-spacing: -0.03em;
        }
        
        .highlight-text {
          color: var(--text-muted); /* Bima style often uses muted/white contrast */
          /* Alternatively, keeping it white and making the rest muted? 
             Let's try Standard White for main, Muted for secondary, or Gradient */
          background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-muted);
          margin-bottom: 3rem;
          max-width: 600px;
          line-height: 1.6;
        }

        .hero-cta {
          display: flex;
          gap: 20px;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 3rem; }
          .hero-subtitle { font-size: 1.1rem; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
