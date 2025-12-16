import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

const Portfolio = () => {
  const { t } = useLanguage();
  const { projects } = useData();
  const [filter, setFilter] = useState('TOUS');

  const filters = ['TOUS', 'WEB', 'MOBILE', 'BRANDING', 'UI/UX'];

  const filteredProjects = useMemo(() => {
    if (filter === 'TOUS') return projects;

    return projects.filter(project => {
      const cat = project.category.toLowerCase();
      const title = project.title.toLowerCase();

      switch (filter) {
        case 'WEB':
          return cat.includes('web') || cat.includes('full stack');
        case 'MOBILE':
          return cat.includes('mobile') || title.includes('mobile') || title.includes('app');
        case 'BRANDING':
          return cat.includes('graphic') || cat.includes('branding');
        case 'UI/UX':
          return cat.includes('ui/ux') || (cat.includes('design') && !cat.includes('web') && !cat.includes('graphic'));
        default:
          return true;
      }
    });
  }, [filter, projects]);

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="portfolio-header">
          <h2 className="section-title-large">Portfolio</h2>
        </div>

        <p className="section-description">
          Une sélection de projets qui illustrent la diversité de nos expertises :
          produits SaaS, expériences mobiles, identités de marque et interfaces sur-mesure.
        </p>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filteredProjects.map((project, index) => (
            <Link to={`/project/${project.id}`} key={project.id || index} className={`project-card glass ${project.size}`}>
              <div className="card-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="card-content">
                <div className="card-header">
                  <span className="category">{project.category}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="card-footer">
                  <button className="arrow-btn">→</button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="view-more-container">
          <button className="btn-outline view-more-btn">Voir tous les projets</button>
        </div>
      </div>
      <style>{`
        .portfolio {
          padding: 100px 0;
          background: var(--bg-color); /* Ensure consistent background */
        }

        .portfolio-header {
            display: flex;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 20px;
        }

        .section-label {
            font-family: monospace;
            color: var(--primary-color);
            font-size: 1.2rem;
            margin-top: 15px; /* Visual alignment with big text */
            font-weight: 600;
        }

        .section-title-large {
            font-size: 5rem; /* Huge title like in image */
            font-weight: 800;
            letter-spacing: -2px;
            line-height: 1;
            margin: 0;
        }

        .section-description {
            max-width: 600px;
            color: var(--text-muted);
            margin-bottom: 50px;
            line-height: 1.6;
            margin-left: 60px; /* Align with title start roughly */
        }

        /* Filters */
        .filter-tabs {
            display: flex;
            gap: 30px;
            margin-bottom: 50px;
            margin-left: 60px; /* Align with content */
            flex-wrap: wrap;
        }

        .filter-btn {
            background: none;
            border: none;
            color: var(--text-muted);
            font-size: 0.8rem;
            font-weight: 600;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            transition: all 0.3s ease;
            position: relative;
            padding-bottom: 5px;
        }

        .filter-btn:hover {
            color: var(--primary-color);
        }

        .filter-btn.active {
            color: var(--primary-color);
        }
        .filter-btn.active::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: var(--primary-color);
            box-shadow: 0 0 10px var(--primary-color);
        }

        /* Grid */
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          grid-auto-flow: dense;
          margin-bottom: 60px;
        }

        .project-card.large { grid-column: span 2; }
        .project-card.small { grid-column: span 1; }

        .project-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 0;
          position: relative;
          background: #0a0a0a;
          border: 1px solid var(--card-border);
          border-radius: 20px; /* Smooth corners */
        }
        
        /* Ensure consistent image heights */
        .card-image {
          height: 300px;
          width: 100%;
          overflow: hidden;
          position: relative;
        }
        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .project-card:hover .card-image img {
          transform: scale(1.05);
        }

        .card-content {
          padding: 28px;
          display: flex;
          flex-direction: column;
          flex: 1;
          border-top: 1px solid var(--card-border);
        }

        .category {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          color: var(--primary-color);
          font-weight: 700;
          margin-bottom: 12px;
          display: block;
        }

        .project-card h3 {
          font-size: 1.5rem;
          margin-bottom: 12px;
          color: var(--text-color);
          font-weight: 600;
        }

        .project-card p {
          color: var(--text-muted);
          font-size: 1rem;
          margin-bottom: 24px;
          line-height: 1.6;
        }
        
        .card-footer {
          margin-top: auto;
          display: flex;
          justify-content: flex-end;
        }
        
        .arrow-btn {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          border: 1px solid var(--card-border);
          background: transparent;
          color: var(--text-color);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .project-card:hover .arrow-btn {
          background: var(--text-color);
          color: var(--bg-color);
          transform: rotate(-45deg);
        }

        .view-more-container {
            display: flex;
            justify-content: center;
        }
        .view-more-btn {
            border-radius: 50px;
            padding: 12px 30px;
        }

        @media (max-width: 900px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
          }
          .project-card.large, .project-card.small {
            grid-column: span 1;
          }
          .section-title-large {
              font-size: 3rem;
          }
          .filter-tabs {
              margin-left: 0;
              justify-content: center;
          }
           .section-description {
               margin-left: 0;
               text-align: center;
           }
           .portfolio-header {
               justify-content: center;
           }
        }
      `}</style>
    </section>
  );
};

export default Portfolio;
