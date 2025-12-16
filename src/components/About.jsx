import React from 'react';
import photoProfil from '../assets/photo_profil.jpg';
import cvFile from '../assets/CV_OKE.pdf';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">{t.about.title}</h2>

        {/* Bima-style: Grid Layout for About */}
        <div className="about-grid">

          {/* Photo Card */}
          <div className="about-card photo-card glass">
            <div className="img-wrapper">
              <img src={photoProfil} alt="OKE Houénagnon Charbel Lajoie" />
            </div>
          </div>

          {/* Bio Card */}
          <div className="about-card bio-card glass">
            <span className="badge">Bio</span>
            <h3>OKE Houénagnon Charbel Lajoie</h3>
            <p className="role">{t.about.role}</p>
            <div className="bio-text">
              <p dangerouslySetInnerHTML={{ __html: t.about.desc1 }}></p>
              <p dangerouslySetInnerHTML={{ __html: t.about.desc2 }}></p>
              <p dangerouslySetInnerHTML={{ __html: t.about.desc3 }}></p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stat-card glass">
            <h3>3+</h3>
            <p>{t.about.stats.exp}</p>
          </div>
          <div className="stat-card glass">
            <h3>50+</h3>
            <p>{t.about.stats.projects}</p>
          </div>
          <div className="stat-card glass">
            <h3>100%</h3>
            <p>{t.about.stats.engagement}</p>
          </div>

          {/* CV Card */}
          <div className="cv-card glass">
            <a href={cvFile} download="CV_OKE_Houenagnon_Charbel_Lajoie.pdf" className="btn-full">
              {t.about.download_cv}
            </a>
          </div>

        </div>
      </div>
      <style>{`
        .about {
          padding: 100px 0;
        }
        .about-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: auto auto;
          gap: 20px;
        }
        
        /* Grid Areas */
        .photo-card {
          grid-column: span 1;
          grid-row: span 2;
          padding: 10px;
        }
        .bio-card {
          grid-column: span 3;
          grid-row: span 1;
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: start;
        }
        .stat-card {
          grid-column: span 1;
          padding: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .cv-card {
          grid-column: span 3; /* Wait, lets make Stats take 3 slots? No. */
          /* Let's adjust for correct Bento layout */
        }
        
        /* Re-doing grid for better bento fit */
        .about-grid {
           grid-template-columns: repeat(3, 1fr);
        }
        .photo-card {
           grid-column: span 1;
           grid-row: span 2;
           height: 100%;
        }
        .bio-card {
           grid-column: span 2;
           grid-row: span 1;
        }
        /* Stats row below bio */
        .stat-card {
           grid-column: span 1;
        }
        /* New row for CV if needed, or integrate it */
        .cv-card {
           display: none; /* Hide separate card, integrate button elsewhere or keep it? */
        }

        .img-wrapper {
          width: 100%;
          height: 100%;
          border-radius: 12px;
          overflow: hidden;
        }
        .img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .badge {
          background: rgba(59, 130, 246, 0.1);
          color: var(--primary-color);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .role {
          font-size: 1.1rem;
          color: var(--text-muted);
          margin-bottom: 20px;
          font-weight: 500;
        }
        .bio-text p {
           margin-bottom: 15px;
           color: var(--text-color);
           line-height: 1.7;
           opacity: 0.9;
        }
        .bio-text strong {
           color: var(--text-color);
           font-weight: 600;
        }

        .stat-card h3 {
           font-size: 2.5rem;
           background: linear-gradient(to bottom, var(--text-color), var(--text-muted));
           -webkit-background-clip: text;
           -webkit-text-fill-color: transparent;
           margin-bottom: 5px;
        }
        .stat-card p {
           color: var(--text-muted);
           font-size: 0.9rem;
        }

        @media (max-width: 900px) {
          .about-grid {
             grid-template-columns: 1fr;
          }
          .photo-card, .bio-card, .stat-card {
             grid-column: span 1;
             grid-row: auto;
          }
          .photo-card {
             aspect-ratio: 1/1;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
