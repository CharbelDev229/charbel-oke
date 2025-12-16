import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Save, LayoutTemplate } from 'lucide-react';
import toast from 'react-hot-toast';

const HeroManager = () => {
    const { siteContent, updateSiteContent } = useData();
    const [heroData, setHeroData] = useState(siteContent.hero);

    const handleSave = () => {
        updateSiteContent('hero', heroData);
        toast.success('Hero section mise à jour !');
    };

    return (
        <div className="admin-page fade-in">
            <div className="admin-header">
                <div className="header-icon">
                    <LayoutTemplate size={24} />
                </div>
                <div>
                    <h1>Hero Section</h1>
                    <p className="subtitle">Gérez le titre principal et l'accroche de votre site.</p>
                </div>
            </div>

            <div className="admin-card glass">
                <div className="form-group">
                    <label>Titre Principal</label>
                    <input
                        type="text"
                        value={heroData.title}
                        onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                        placeholder="Ex: Transformons vos idées..."
                    />
                </div>

                <div className="form-group">
                    <label>Sous-titre / Description</label>
                    <textarea
                        value={heroData.subtitle}
                        onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                        placeholder="Une brève description de ce que vous faites..."
                        rows={4}
                    />
                </div>

                <div className="form-group">
                    <label>Texte du Bouton CTA</label>
                    <input
                        type="text"
                        value={heroData.cta}
                        onChange={(e) => setHeroData({ ...heroData, cta: e.target.value })}
                        placeholder="Ex: Voir mes projets"
                    />
                </div>

                <div className="form-actions">
                    <button onClick={handleSave} className="btn-primary">
                        <Save size={18} />
                        Enregistrer
                    </button>
                </div>
            </div>

            <style>{`
                .admin-page {
                    max-width: 800px;
                }
                .admin-header {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 32px;
                }
                .header-icon {
                    width: 48px;
                    height: 48px;
                    background: rgba(59, 130, 246, 0.1);
                    border: 1px solid rgba(59, 130, 246, 0.2);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--primary-color);
                }
                h1 {
                    font-size: 1.8rem;
                    margin: 0 0 4px 0;
                }
                .subtitle {
                    color: var(--text-muted);
                    margin: 0;
                }
                
                .admin-card {
                    padding: 32px;
                    border-radius: 20px;
                    border: 1px solid var(--glass-border);
                    background: rgba(10, 10, 10, 0.6);
                }

                .form-group {
                    margin-bottom: 24px;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 500;
                    color: #e2e8f0;
                }
                .form-group input,
                .form-group textarea {
                    width: 100%;
                    padding: 12px 16px;
                    background: rgba(0, 0, 0, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    color: white;
                    font-size: 1rem;
                    transition: all 0.2s;
                }
                .form-group input:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: var(--primary-color);
                    background: rgba(59, 130, 246, 0.05);
                }

                .form-actions {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 32px;
                    padding-top: 24px;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }

                .btn-primary {
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 10px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: filter 0.2s;
                }
                .btn-primary:hover {
                    filter: brightness(1.1);
                }
            `}</style>
        </div>
    );
};

export default HeroManager;
