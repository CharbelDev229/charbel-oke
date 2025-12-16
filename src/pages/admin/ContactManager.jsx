import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Save, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactManager = () => {
    const { siteContent, updateSiteContent } = useData();
    // Assuming contact info might be part of 'about' or a separate 'contact' key. 
    // If it relies on hardcoded data in Contact.jsx, we need to create a 'contact' object in global state.
    // For now, I'll assume we can create/edit a 'contact' object in siteContent.
    const [contactData, setContactData] = useState(siteContent.contact || {
        email: 'charbeloke77@gmail.com',
        phone: '2290196195843',
        linkedin: '',
        github: ''
    });

    const handleSave = () => {
        updateSiteContent('contact', contactData);
        toast.success('Infos de contact mises à jour !');
    };

    return (
        <div className="admin-page fade-in">
            <div className="admin-header">
                <div className="header-icon">
                    <Mail size={24} />
                </div>
                <div>
                    <h1>Contact</h1>
                    <p className="subtitle">Gérez vos coordonnées et liens sociaux.</p>
                </div>
            </div>

            <div className="admin-card glass">
                <div className="form-group">
                    <label>Email de contact</label>
                    <input
                        type="email"
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        placeholder="email@example.com"
                    />
                </div>

                <div className="form-group">
                    <label>Numéro de téléphone / WhatsApp</label>
                    <input
                        type="text"
                        value={contactData.phone}
                        onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                        placeholder="+229..."
                    />
                </div>

                <div className="section-divider">
                    <span>Réseaux Sociaux</span>
                </div>

                <div className="form-group">
                    <label>LinkedIn URL</label>
                    <input
                        type="text"
                        value={contactData.linkedin}
                        onChange={(e) => setContactData({ ...contactData, linkedin: e.target.value })}
                        placeholder="https://linkedin.com/in/..."
                    />
                </div>

                <div className="form-group">
                    <label>GitHub URL</label>
                    <input
                        type="text"
                        value={contactData.github}
                        onChange={(e) => setContactData({ ...contactData, github: e.target.value })}
                        placeholder="https://github.com/..."
                    />
                </div>

                <div className="form-group">
                    <label>Facebook URL</label>
                    <input
                        type="text"
                        value={contactData.facebook || ''}
                        onChange={(e) => setContactData({ ...contactData, facebook: e.target.value })}
                        placeholder="https://facebook.com/..."
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
                h1 { font-size: 1.8rem; margin: 0 0 4px 0; }
                .subtitle { color: var(--text-muted); margin: 0; }
                
                .admin-card {
                    padding: 32px;
                    border-radius: 20px;
                    border: 1px solid var(--glass-border);
                    background: rgba(10, 10, 10, 0.6);
                }

                .form-group { margin-bottom: 24px; }
                .form-group label { display: block; margin-bottom: 8px; font-weight: 500; color: #e2e8f0; }
                
                .form-group input {
                    width: 100%;
                    padding: 12px 16px;
                    background: rgba(0, 0, 0, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    color: white;
                    font-size: 1rem;
                    transition: all 0.2s;
                }
                .form-group input:focus {
                    outline: none;
                    border-color: var(--primary-color);
                    background: rgba(59, 130, 246, 0.05);
                }

                .section-divider {
                    display: flex;
                    align-items: center;
                    margin: 32px 0 24px 0;
                    color: var(--text-muted);
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .section-divider::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: rgba(255,255,255,0.1);
                    margin-left: 16px;
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
                .btn-primary:hover { filter: brightness(1.1); }
            `}</style>
        </div>
    );
};

export default ContactManager;
