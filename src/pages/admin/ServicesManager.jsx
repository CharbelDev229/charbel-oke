import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Trash2, Edit2, Grip, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const ServicesManager = () => {
    const { siteContent, updateSiteContent } = useData();
    // Ensure services is an array
    const [services, setServices] = useState(siteContent.services || []);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ title: '', description: '', icon: 'Code' });

    const handleSave = () => {
        updateSiteContent('services', services);
        toast.success('Services mis à jour !');
    };

    const handleEdit = (service, index) => {
        setEditingId(index);
        setEditForm(service);
    };

    const handleDelete = (index) => {
        if (window.confirm('Supprimer ce service ?')) {
            const newServices = services.filter((_, i) => i !== index);
            setServices(newServices);
            // Auto save on delete? Maybe wait for explicit save.
            // Let's rely on the main Save button for persistence to avoid accidental deletes being permanent immediately.
        }
    };

    const handleUpdateService = () => {
        const newServices = [...services];
        if (editingId !== null) {
            newServices[editingId] = editForm;
        } else {
            newServices.push(editForm);
        }
        setServices(newServices);
        setEditingId(null);
        setEditForm({ title: '', description: '', icon: 'Code' });
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditForm({ title: '', description: '', icon: 'Code' });
    };

    return (
        <div className="admin-page fade-in">
            <div className="admin-header">
                <div className="header-icon">
                    <Grip size={24} />
                </div>
                <div>
                    <h1>Services</h1>
                    <p className="subtitle">Gérez les cartes de services affichées sur l'accueil.</p>
                </div>
            </div>

            <div className="admin-grid">
                {/* List of Services */}
                <div className="services-list">
                    {services.map((service, index) => (
                        <div key={index} className="service-item glass">
                            <div className="service-info">
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </div>
                            <div className="service-actions">
                                <button onClick={() => handleEdit(service, index)} className="btn-icon">
                                    <Edit2 size={16} />
                                </button>
                                <button onClick={() => handleDelete(index)} className="btn-icon delete">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        className="add-service-btn dashed"
                        onClick={() => {
                            setEditingId(null); // New mode
                            setEditingId('new'); // Use special flag or just set form open
                            setEditForm({ title: '', description: '', icon: 'Code' });
                        }}
                    >
                        <Plus size={24} />
                        Ajouter un service
                    </button>
                </div>

                {/* Edit/Add Form - Only visible when editing or adding */}
                {(editingId !== null || editingId === 'new') && (
                    <div className="service-editor glass">
                        <h3>{editingId === 'new' ? 'Nouveau Service' : 'Modifier le Service'}</h3>

                        <div className="form-group">
                            <label>Titre</label>
                            <input
                                value={editForm.title}
                                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                placeholder="Titre du service"
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                value={editForm.description}
                                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                placeholder="Description..."
                                rows={4}
                            />
                        </div>

                        <div className="form-group">
                            <label>Nom de l'icône (Lucide React)</label>
                            <input
                                value={editForm.icon}
                                onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                                placeholder="Ex: Code, Layout, Smartphone..."
                            />
                        </div>

                        <div className="editor-actions">
                            <button onClick={handleCancel} className="btn-secondary">Annuler</button>
                            <button onClick={handleUpdateService} className="btn-primary-small">
                                {editingId === 'new' ? 'Ajouter' : 'Mettre à jour'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="page-actions">
                <button onClick={handleSave} className="btn-primary">
                    <Save size={18} />
                    Sauvegarder les changements
                </button>
            </div>

            <style>{`
                .admin-page {
                    max-width: 1000px;
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

                .admin-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 32px;
                }
                @media(max-width: 900px) {
                    .admin-grid { grid-template-columns: 1fr; }
                }

                .services-list {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .service-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px;
                    border-radius: 12px;
                    border: 1px solid var(--glass-border);
                    background: rgba(255, 255, 255, 0.03);
                }
                .service-info h3 { margin: 0 0 4px 0; font-size: 1rem; }
                .service-info p { margin: 0; color: var(--text-muted); font-size: 0.85rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

                .service-actions {
                    display: flex;
                    gap: 8px;
                }
                .btn-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    border: none;
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }
                .btn-icon:hover { background: rgba(255, 255, 255, 0.2); }
                .btn-icon.delete:hover { background: #ef4444; }

                .add-service-btn {
                    width: 100%;
                    padding: 20px;
                    border: 2px dashed rgba(255,255,255,0.1);
                    border-radius: 12px;
                    background: transparent;
                    color: var(--text-muted);
                    font-size: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    transition: all 0.2s;
                }
                .add-service-btn:hover {
                    border-color: var(--primary-color);
                    color: var(--primary-color);
                    background: rgba(59, 130, 246, 0.05);
                }

                /* Editor */
                .service-editor {
                    padding: 24px;
                    border-radius: 16px;
                    border: 1px solid var(--glass-border);
                    background: #111;
                    height: fit-content;
                }
                .service-editor h3 { margin-top: 0; margin-bottom: 20px; }

                .form-group { margin-bottom: 20px; }
                .form-group label { display: block; margin-bottom: 8px; font-size: 0.9rem; color: #ccc; }
                .form-group input, .form-group textarea {
                    width: 100%;
                    padding: 12px;
                    background: rgba(0,0,0,0.5);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px;
                    color: white;
                    font-family: inherit;
                }
                .form-group input:focus, .form-group textarea:focus {
                    outline: none;
                    border-color: var(--primary-color);
                }

                .editor-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 12px;
                    margin-top: 24px;
                }
                .btn-secondary, .btn-primary-small {
                    padding: 8px 16px;
                    border-radius: 6px;
                    border: none;
                    cursor: pointer;
                    font-weight: 500;
                }
                .btn-secondary { background: transparent; color: #ccc; border: 1px solid #333; }
                .btn-primary-small { background: var(--primary-color); color: white; }

                .page-actions {
                    margin-top: 40px;
                    display: flex;
                    justify-content: flex-end;
                    padding-top: 20px;
                    border-top: 1px solid rgba(255,255,255,0.1);
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

export default ServicesManager;
