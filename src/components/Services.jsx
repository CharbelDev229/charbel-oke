import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, BarChart2, Layers, CheckCircle2 } from 'lucide-react';

const Services = () => {
  const { t } = useLanguage();

  // Mapping icons to service indices if needed, or generic ones
  const icons = [
    <Sparkles size={32} />,        // Web/AI
    <Layers size={32} />,          // Design/Mobile
    <BarChart2 size={32} />        // Data/Analysis
  ];

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="header-content fade-in">
          <h4 className="badge-title">NOS EXPERTISES</h4>
          <h2 className="main-title">{t.services.title}</h2>
          <p className="description">
            Transformez vos idées en solutions numériques performantes grâce à une expertise
            pointue en développement, design et data.
          </p>
        </div>

        {/* Main Unified Card */}
        <div className="advantages-card glass fade-in-up">
          <div className="services-grid">
            {t.services.items.map((service, index) => (
              <div key={index} className="service-column">
                <div className="icon-wrapper">
                  {icons[index] || <Sparkles size={32} />}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Tags / Features */}
        <div className="features-tags fade-in">
          {["Design UI/UX", "Mobile First", "SEO Optimisé", "Clean Code", "Support Réactif", "Architecture Modulaire"].map((tag, i) => (
            <div key={i} className="feature-pill glass-sm">
              <CheckCircle2 size={16} className="feature-icon" />
              <span>{tag}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .services-section {
            padding: 120px 0;
            position: relative;
        }

        .header-content {
            margin-bottom: 60px;
            max-width: 800px;
            /* Ensure normal block layout to prevent weird horizontal flexing */
            display: block; 
        }
        
        .badge-title {
            color: var(--primary-color);
            font-size: 0.85rem;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .badge-title::before {
            content: '★'; 
            font-size: 1rem;
        }

        .main-title {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 24px;
            line-height: 1.1;
            color: var(--text-color);
        }

        .description {
            font-size: 1.1rem;
            color: var(--text-muted);
            line-height: 1.6;
            max-width: 600px;
        }

        /* Unified Card Style */
        .advantages-card {
            border-radius: 32px;
            padding: 60px;
            background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
            border: 1px solid var(--glass-border);
            margin-bottom: 60px;
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(10px);
        }

        /* Light Mode Overrides */
        [data-theme="light"] .advantages-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }
        [data-theme="light"] .description {
            color: #475569;
        }
        [data-theme="light"] .icon-wrapper {
            background: #f1f5f9;
            color: var(--primary-color);
            border: none;
        }
        [data-theme="light"] .service-column:not(:last-child)::after {
            background: linear-gradient(180deg, transparent, #e2e8f0, transparent);
        }
        [data-theme="light"] .feature-pill {
            background: #f8fafc;
            color: #475569;
            border-color: #e2e8f0;
        }
        [data-theme="light"] .feature-pill:hover {
            background: #e2e8f0;
            color: #1e293b;
        }

        .services-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 60px; /* Large gap for cleaner look */
            position: relative;
        }
        /* Vertical dividers between columns */
        .service-column:not(:last-child)::after {
            content: '';
            position: absolute;
            right: -30px;
            top: 0;
            height: 100%;
            width: 1px;
            background: linear-gradient(180deg, transparent, rgba(255,255,255,0.1), transparent);
        }

        .service-column {
            position: relative;
        }

        .icon-wrapper {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: #000; /* Dark circle background */
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            margin-bottom: 24px;
            border: 1px solid rgba(255,255,255,0.1);
        }

        .service-column h3 {
            font-size: 1.5rem;
            margin-bottom: 16px;
            font-weight: 600;
            color: var(--text-color);
        }

        .service-column p {
            color: var(--text-muted);
            line-height: 1.7;
            font-size: 0.95rem;
        }

        /* Feature Pills */
        .features-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            justify-content: center;
        }

        .feature-pill {
            padding: 12px 24px;
            border-radius: 100px;
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.05);
            color: var(--text-muted);
            font-size: 0.9rem;
            transition: all 0.3s;
        }
        .feature-pill:hover {
            background: rgba(255,255,255,0.05);
            color: white;
            border-color: rgba(255,255,255,0.1);
        }
        .feature-icon {
            color: var(--primary-color);
        }

        @media (max-width: 1024px) {
            .services-grid {
                grid-template-columns: 1fr;
                gap: 40px;
            }
            .service-column:not(:last-child)::after {
                display: none; /* No vertical divider on mobile */
            }
            .service-column:not(:last-child) {
                border-bottom: 1px solid rgba(255,255,255,0.05);
                padding-bottom: 40px;
            }
            .advantages-card {
                padding: 40px;
            }
            .main-title {
                font-size: 2.5rem;
            }
        }
      `}</style>
    </section>
  );
};

export default Services;
