import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';

const ContentManager = () => {
    const { siteContent, updateSiteContent } = useData();
    const [activeTab, setActiveTab] = useState('hero');

    // Local state for edits
    const [heroData, setHeroData] = useState(siteContent.hero);
    const [aboutData, setAboutData] = useState(siteContent.about);

    // Services is an array, handling it simpler for now (editing titles only)
    // For full dynamic services add/remove, we would need a full CRUD like projects.
    // Here we just allow editing the 3 existing ones' text.

    const handleSave = () => {
        if (activeTab === 'hero') {
            updateSiteContent('hero', heroData);
        } else if (activeTab === 'about') {
            updateSiteContent('about', aboutData);
        }
        toast.success('Contenu mis à jour !');
    };

    return (
        <div style={{ maxWidth: '800px' }}>
            <h2 style={{ marginBottom: '32px' }}>Gestion du Contenu</h2>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }}>
                <button
                    onClick={() => setActiveTab('hero')}
                    style={{ ...tabStyle, fontWeight: activeTab === 'hero' ? 'bold' : 'normal', color: activeTab === 'hero' ? 'var(--primary-color)' : 'var(--text-muted)' }}
                >
                    Hero Section
                </button>
                <button
                    onClick={() => setActiveTab('about')}
                    style={{ ...tabStyle, fontWeight: activeTab === 'about' ? 'bold' : 'normal', color: activeTab === 'about' ? 'var(--primary-color)' : 'var(--text-muted)' }}
                >
                    À Propos
                </button>
                {/* Add more tabs as needed */}
            </div>

            <div className="glass" style={{ padding: '32px', borderRadius: '16px' }}>

                {activeTab === 'hero' && (
                    <div style={{ display: 'grid', gap: '24px' }}>
                        <div>
                            <label style={labelStyle}>Titre Principal</label>
                            <input
                                value={heroData.title}
                                onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                                style={inputStyle}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Sous-titre</label>
                            <textarea
                                value={heroData.subtitle}
                                onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                                style={{ ...inputStyle, minHeight: '100px' }}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Texte Bouton CTA</label>
                            <input
                                value={heroData.cta}
                                onChange={(e) => setHeroData({ ...heroData, cta: e.target.value })}
                                style={inputStyle}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'about' && (
                    <div style={{ display: 'grid', gap: '24px' }}>
                        <div>
                            <label style={labelStyle}>Biographie</label>
                            <textarea
                                value={aboutData.bio}
                                onChange={(e) => setAboutData({ ...aboutData, bio: e.target.value })}
                                style={{ ...inputStyle, minHeight: '150px' }}
                            />
                        </div>
                        {/* Skills management could be added here */}
                    </div>
                )}

                <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={handleSave} className="cta-button" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}>
                        <Save size={18} />
                        Enregistrer les modifications
                    </button>
                </div>

            </div>
        </div>
    );
};

const tabStyle = {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '8px 16px'
};

const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    color: 'var(--text-muted)',
    fontSize: '14px'
};

const inputStyle = {
    width: '100%',
    padding: '16px',
    background: 'var(--bg-color)',
    border: '1px solid var(--glass-border)',
    borderRadius: '8px',
    color: 'white',
    outline: 'none',
    fontSize: '16px'
};

export default ContentManager;
