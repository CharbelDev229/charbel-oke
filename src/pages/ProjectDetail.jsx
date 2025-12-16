import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, Github, ExternalLink, Globe, Layers, Calendar, ArrowRight } from 'lucide-react';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { projects } = useData();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const project = projects.find(p => p.id.toString() === id);

    if (!project) {
        return (
            <div className="project-not-found">
                <h2>Projet introuvable</h2>
                <button onClick={() => navigate('/')} className="btn-back">
                    Retour à l'accueil
                </button>
            </div>
        );
    }

    // Mock extra data if not present (simulate the "Technologies" and "Platform" from image)
    const platforms = project.category.includes('Mobile') ? ['iOS', 'Android'] : ['Web', 'Desktop'];
    const techs = ['React', 'Tailwind', 'Node.js', 'Figma']; // Default mock
    const year = "2024";

    return (
        <div className="project-detail-page">
            <div className="container">
                {/* Header Navigation */}
                <header className="detail-header">
                    <button onClick={() => navigate(-1)} className="back-link">
                        <ArrowLeft size={20} />
                        Retour aux projets
                    </button>
                </header>

                {/* Hero Section */}
                <section className="detail-hero">
                    <div className="hero-content">
                        <div className="meta-tags">
                            <span className="category-tag">{project.category}</span>
                            <span className="platform-tag">Platforme {platforms[0].toLowerCase()}</span>
                        </div>

                        <h1 className="project-title">{project.title}</h1>

                        <div className="project-links">
                            <a href="#" className="github-btn" title="Voir le code">
                                <Github size={24} />
                            </a>
                            <a href="#" className="live-btn" title="Voir le site">
                                <span className="live-icon">
                                    <Globe size={24} />
                                </span>
                            </a>
                        </div>
                    </div>

                    <div className="tech-stack-floating">
                        <span className="tech-label">TECHNOLOGIES</span>
                        <div className="tech-badges">
                            {techs.map((tech, i) => (
                                <span key={i} className="tech-badge">{tech}</span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Main Visual */}
                <section className="project-visual">
                    <div className="laptop-mockup">
                        {/* Simple CSS-only mockup frame or just the image styled nicely */}
                        <div className="screen-content">
                            <img src={project.image} alt={project.title} />
                        </div>
                        <div className="macbook-base"></div>
                    </div>
                </section>

                {/* Main Content Info */}
                <section className="project-info-grid">
                    <div className="info-left">
                        <h2 className="section-heading">À propos du projet</h2>
                        <div className="description-text">
                            <p className="lead">{project.description}</p>
                            <p>{project.content || "Ce projet a été conçu pour répondre à une problématique spécifique en utilisant les dernières technologies du web. L'interface a été pensée pour offrir une expérience utilisateur fluide et intuitive, tout en garantissant des performances optimales."}</p>

                            <div className="key-features">
                                <div className="feature-item">
                                    <Layers className="feature-icon" />
                                    <div>
                                        <h4>Design System</h4>
                                        <p>Composants réutilisables et cohérents.</p>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <Globe className="feature-icon" />
                                    <div>
                                        <h4>SEO Optimisé</h4>
                                        <p>Structure sémantique et meta-tags dynamiques.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            className="cta-action"
                            onClick={() => {
                                navigate('/');
                                setTimeout(() => {
                                    const contactSection = document.getElementById('contact');
                                    if (contactSection) {
                                        contactSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }, 100);
                            }}
                        >
                            Déposer une candidature
                            <ArrowRight size={18} />
                        </button>
                    </div>

                    <div className="info-right">
                        <div className="info-card glass">
                            <h3>Détails</h3>
                            <ul className="details-list">
                                <li>
                                    <span className="label">Année</span>
                                    <span className="value">{year}</span>
                                </li>
                                <li>
                                    <span className="label">Client</span>
                                    <span className="value">Confidentiel</span>
                                </li>
                                <li>
                                    <span className="label">Rôle</span>
                                    <span className="value">Lead Dev & UI</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Next Project Teaser (Optional, static for now) */}
                <section className="next-project">
                    <div className="next-label">Projet Suivant</div>
                    <h3>Application Dashboard</h3>
                </section>
            </div>

            <style>{`
                .project-detail-page {
                    padding-top: 120px;
                    padding-bottom: 80px;
                    min-height: 100vh;
                    background-color: #000; /* Deep black as requested */
                    color: #fff;
                }

                .detail-header {
                    margin-bottom: 60px;
                }

                .back-link {
                    background: transparent;
                    border: none;
                    color: #888;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: color 0.3s;
                }
                .back-link:hover {
                    color: #fff;
                }

                /* Hero */
                .detail-hero {
                    position: relative;
                    margin-bottom: 80px;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                }

                .meta-tags {
                    margin-bottom: 20px;
                    display: flex;
                    gap: 10px;
                }

                .category-tag {
                    color: #3b82f6; /* Blue accent like in image */
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-size: 0.9rem;
                }
                
                .platform-tag {
                    background: rgba(255,255,255,0.1);
                    padding: 2px 10px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    color: #aaa;
                }

                .project-title {
                    font-size: 5rem;
                    font-weight: 800;
                    margin: 0 0 30px 0;
                    line-height: 1;
                    letter-spacing: -2px;
                }

                .project-links {
                    display: flex;
                    gap: 20px;
                }

                .github-btn, .live-btn {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: #fff;
                    color: #000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.2s;
                }
                .github-btn:hover, .live-btn:hover {
                    transform: scale(1.1);
                }
                .live-btn {
                    background: #252525;
                    color: #fff;
                }

                /* Tech Stack Floating Right */
                .tech-stack-floating {
                    text-align: right;
                }
                .tech-label {
                    display: block;
                    font-size: 0.8rem;
                    color: #666;
                    margin-bottom: 15px;
                    font-weight: 700;
                    letter-spacing: 1px;
                }
                .tech-badges {
                    display: flex;
                    gap: 10px;
                }
                .tech-badge {
                    border: 1px solid #333;
                    padding: 8px 16px;
                    border-radius: 6px;
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                /* Visual / Mockup */
                .project-visual {
                    margin-bottom: 100px;
                    display: flex;
                    justify-content: center;
                }

                .laptop-mockup {
                    width: 100%;
                    max-width: 1000px;
                    position: relative;
                }

                .screen-content {
                    border: 12px solid #1a1a1a;
                    border-bottom: 0;
                    border-radius: 20px 20px 0 0;
                    overflow: hidden;
                    aspect-ratio: 16/10;
                    position: relative;
                }

                .screen-content img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .macbook-base {
                    height: 20px;
                    background: #222;
                    border-radius: 0 0 20px 20px;
                    width: 100%;
                    margin-top: -1px; /* fix gap */
                    position: relative;
                }
                .macbook-base::after {
                    content: '';
                    display: block;
                    width: 120px;
                    height: 12px;
                    background: #333;
                    border-radius: 0 0 10px 10px;
                    margin: 0 auto;
                }

                /* Grid Layout for Info */
                .project-info-grid {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 80px;
                    margin-bottom: 100px;
                }

                .section-heading {
                    font-size: 2rem;
                    margin-bottom: 30px;
                }

                .description-text {
                    color: #bbb;
                    line-height: 1.8;
                    font-size: 1.1rem;
                    margin-bottom: 40px;
                }
                .lead {
                    font-size: 1.4rem;
                    color: #fff;
                    margin-bottom: 20px;
                    font-weight: 300;
                }

                .key-features {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 30px;
                    margin-top: 40px;
                }
                .feature-item {
                    display: flex;
                    gap: 15px;
                }
                .feature-icon {
                    color: #3b82f6;
                    margin-top: 4px;
                }
                .feature-item h4 {
                    margin: 0 0 5px 0;
                    color: #fff;
                }
                .feature-item p {
                    margin: 0;
                    font-size: 0.9rem;
                    color: #888;
                }

                .cta-action {
                    background: #1d4ed8;
                    color: white;
                    border: none;
                    padding: 16px 32px;
                    border-radius: 8px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    transition: background 0.3s;
                }
                .cta-action:hover {
                    background: #2563eb;
                }

                /* Right Sidebar */
                .info-card {
                    padding: 40px;
                    border-radius: 16px;
                    border: 1px solid #222;
                    background: #0a0a0a;
                }
                .details-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .details-list li {
                    display: flex;
                    justify-content: space-between;
                    padding: 15px 0;
                    border-bottom: 1px solid #222;
                }
                .details-list li:last-child {
                    border-bottom: none;
                }
                .details-list .label {
                    color: #666;
                }
                .details-list .value {
                    font-weight: 600;
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .project-title { font-size: 3.5rem; }
                    .project-info-grid { grid-template-columns: 1fr; gap: 40px; }
                }

                @media (max-width: 768px) {
                    .detail-hero { flex-direction: column; align-items: flex-start; gap: 40px; }
                    .project-title { font-size: 2.5rem; }
                    .tech-stack-floating { text-align: left; }
                }
            `}</style>
        </div>
    );
};

export default ProjectDetail;
