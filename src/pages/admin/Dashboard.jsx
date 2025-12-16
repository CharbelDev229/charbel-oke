import React from 'react';
import { useData } from '../../context/DataContext';
import { FolderKanban, FileText, Zap, ArrowRight, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { projects } = useData();
    // Mock data for other stats since we don't have them in context yet
    const stats = [
        { label: 'Projets Totaux', value: projects.length, icon: FolderKanban, color: '#3b82f6', link: '/admin/projects' },
        { label: 'Articles de Blog', value: '0', icon: PenTool, color: '#10b981', link: '/admin/blog' },
        { label: 'Visites ce mois', value: '1.2k', icon: Zap, color: '#f59e0b', link: null }, // Mock
    ];

    return (
        <div className="dashboard fade-in">
            <h1 className="page-title">Tableau de bord</h1>
            <p className="page-subtitle">Bienvenue sur votre espace d'administration.</p>

            {/* Stats Grid */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <Link
                        to={stat.link || '#'}
                        key={index}
                        className={`stat-card glass ${!stat.link ? 'disabled' : ''}`}
                    >
                        <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                            <stat.icon size={24} />
                        </div>
                        <div className="stat-info">
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                        {stat.link && <ArrowRight size={16} className="stat-arrow" />}
                    </Link>
                ))}
            </div>

            {/* Quick Actions / Recent Activity */}
            <div className="dashboard-content">
                <div className="glass content-card">
                    <div className="card-header">
                        <h3>Derniers Projets</h3>
                        <Link to="/admin/projects" className="see-all">Voir tout</Link>
                    </div>
                    <div className="recent-list">
                        {projects.slice(0, 5).map(project => (
                            <div key={project.id} className="recent-item">
                                <div className="project-mini-info">
                                    <div className="mini-thumb">
                                        <img src={project.image} alt={project.title} />
                                    </div>
                                    <div>
                                        <h4>{project.title}</h4>
                                        <span className="category-badge">{project.category}</span>
                                    </div>
                                </div>
                                <Link to={`/admin/projects?edit=${project.id}`} className="edit-btn">
                                    Modifier
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* You could add a "Recent Messages" card here if you had contact form submissions stored in DB */}
            </div>

            <style>{`
                .page-title {
                    font-size: 2rem;
                    margin: 0 0 8px 0;
                }
                .page-subtitle {
                    color: var(--text-muted);
                    margin-bottom: 40px;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 24px;
                    margin-bottom: 40px;
                }

                .stat-card {
                    padding: 24px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    text-decoration: none;
                    color: var(--text-color);
                    transition: transform 0.2s, border-color 0.2s;
                    position: relative;
                    border: 1px solid var(--glass-border);
                    background: rgba(255, 255, 255, 0.03);
                }
                .stat-card:hover {
                    transform: translateY(-5px);
                    border-color: rgba(255, 255, 255, 0.2);
                    background: rgba(255, 255, 255, 0.05);
                }
                .stat-card.disabled {
                    cursor: default;
                    pointer-events: none;
                }

                .stat-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .stat-info {
                    display: flex;
                    flex-direction: column;
                }
                .stat-value {
                    font-size: 1.8rem;
                    font-weight: 700;
                    line-height: 1;
                    margin-bottom: 4px;
                }
                .stat-label {
                    color: var(--text-muted);
                    font-size: 0.9rem;
                }
                .stat-arrow {
                    position: absolute;
                    top: 24px;
                    right: 24px;
                    color: var(--text-muted);
                    opacity: 0;
                    transition: opacity 0.2s;
                }
                .stat-card:hover .stat-arrow {
                    opacity: 1;
                }

                /* Content Grid */
                .dashboard-content {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 32px;
                }
                @media (max-width: 1024px) {
                    .dashboard-content { grid-template-columns: 1fr; }
                }

                .content-card {
                    padding: 32px;
                    border-radius: 20px;
                    border: 1px solid var(--glass-border);
                    background: #0a0a0a;
                }

                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 24px;
                }
                .card-header h3 { margin: 0; font-size: 1.2rem; }
                .see-all {
                    color: var(--primary-color);
                    font-size: 0.9rem;
                    text-decoration: none;
                }

                .recent-list {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .recent-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 16px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }
                .recent-item:last-child {
                    border-bottom: none;
                    padding-bottom: 0;
                }

                .project-mini-info {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }
                .mini-thumb {
                    width: 50px;
                    height: 50px;
                    border-radius: 8px;
                    overflow: hidden;
                    background: #222;
                }
                .mini-thumb img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .project-mini-info h4 {
                    margin: 0 0 4px 0;
                    font-size: 1rem;
                }
                .category-badge {
                    font-size: 0.75rem;
                    padding: 2px 8px;
                    border-radius: 4px;
                    background: rgba(255, 255, 255, 0.1);
                    color: #aaa;
                }

                .edit-btn {
                    font-size: 0.85rem;
                    color: var(--text-muted);
                    text-decoration: none;
                    padding: 6px 12px;
                    border-radius: 6px;
                    transition: background 0.2s;
                }
                .edit-btn:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
