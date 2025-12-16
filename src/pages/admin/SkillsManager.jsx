import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Save, Plus, Trash2, X, Code2 } from 'lucide-react';
import toast from 'react-hot-toast';

const SkillsManager = () => {
    const { siteContent, updateSiteContent } = useData();
    const [skillsData, setSkillsData] = useState(siteContent.skills || []);
    const [isAdding, setIsAdding] = useState(false);

    // Initial state for new category
    const [newCategory, setNewCategory] = useState({
        id: null,
        category: '',
        items: []
    });
    const [paramsString, setParamsString] = useState(''); // Temp state for comma-separated items

    const handleSave = () => {
        updateSiteContent('skills', skillsData);
        toast.success('Compétences mises à jour !');
    };

    const handleDeleteCategory = (id) => {
        if (window.confirm('Supprimer cette catégorie ?')) {
            const updated = skillsData.filter(s => s.id !== id);
            setSkillsData(updated);
        }
    };

    const handleAddCategory = () => {
        if (!newCategory.category) return toast.error('Ajoutez un titre de catégorie');

        const itemsArray = paramsString.split(',').map(item => item.trim()).filter(i => i);

        const newEntry = {
            id: Date.now(),
            category: newCategory.category,
            items: itemsArray
        };

        setSkillsData([...skillsData, newEntry]);
        setIsAdding(false);
        setNewCategory({ id: null, category: '', items: [] });
        setParamsString('');
        toast.success('Catégorie ajoutée');
    };

    const handleUpdateItems = (id, newItemsString) => {
        const updated = skillsData.map(s => {
            if (s.id === id) {
                return {
                    ...s,
                    items: newItemsString.split(',').map(item => item.trim()).filter(i => i)
                };
            }
            return s;
        });
        setSkillsData(updated);
    };

    const handleUpdateCategoryTitle = (id, newTitle) => {
        const updated = skillsData.map(s => s.id === id ? { ...s, category: newTitle } : s);
        setSkillsData(updated);
    };

    return (
        <div className="admin-page fade-in">
            <div className="admin-header">
                <div className="header-icon">
                    <Code2 size={24} />
                </div>
                <div>
                    <h1>Compétences</h1>
                    <p className="subtitle">Gérez vos compétences techniques par catégorie.</p>
                </div>
                {!isAdding && (
                    <button onClick={() => setIsAdding(true)} className="btn-primary" style={{ marginLeft: 'auto' }}>
                        <Plus size={18} /> Nouvelle Catégorie
                    </button>
                )}
            </div>

            {/* Add New Category Form */}
            {isAdding && (
                <div className="admin-card glass fade-in-up" style={{ marginBottom: '32px', border: '1px solid var(--primary-color)' }}>
                    <div className="form-head">
                        <h3>Nouvelle Catégorie</h3>
                        <button onClick={() => setIsAdding(false)} className="close-btn"><X size={20} /></button>
                    </div>
                    <div className="form-group">
                        <label>Nom de la catégorie</label>
                        <input
                            value={newCategory.category}
                            onChange={(e) => setNewCategory({ ...newCategory, category: e.target.value })}
                            placeholder="Ex: Backend, Design..."
                        />
                    </div>
                    <div className="form-group">
                        <label>Compétences (séparées par une virgule)</label>
                        <textarea
                            value={paramsString}
                            onChange={(e) => setParamsString(e.target.value)}
                            placeholder="React, Node.js, Python..."
                            rows={3}
                        />
                    </div>
                    <div className="form-actions">
                        <button onClick={handleAddCategory} className="btn-primary">Ajouter</button>
                    </div>
                </div>
            )}

            {/* List of Categories */}
            <div className="categories-grid">
                {skillsData.map((skillGroup) => (
                    <div key={skillGroup.id} className="admin-card glass skill-card">
                        <div className="card-header-actions">
                            <input
                                className="category-title-input"
                                value={skillGroup.category}
                                onChange={(e) => handleUpdateCategoryTitle(skillGroup.id, e.target.value)}
                            />
                            <button onClick={() => handleDeleteCategory(skillGroup.id)} className="delete-btn">
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="form-group">
                            <label>Compétences</label>
                            <textarea
                                value={skillGroup.items.join(', ')}
                                onChange={(e) => handleUpdateItems(skillGroup.id, e.target.value)}
                                rows={4}
                            />
                        </div>
                        <div className="tags-preview">
                            {skillGroup.items.map((tag, idx) => (
                                <span key={idx} className="skill-tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="floating-save">
                <button onClick={handleSave} className="btn-primary big-save">
                    <Save size={20} />
                    Enregistrer les modifications
                </button>
            </div>

            <style>{`
                .admin-page { max-width: 1000px; padding-bottom: 80px; }
                
                .admin-header {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 32px;
                }
                .header-icon {
                    width: 48px; height: 48px;
                    background: rgba(59, 130, 246, 0.1);
                    border: 1px solid rgba(59, 130, 246, 0.2);
                    border-radius: 12px;
                    display: flex; align-items: center; justify-content: center;
                    color: var(--primary-color);
                }
                h1 { margin: 0 0 4px 0; font-size: 1.8rem; }
                .subtitle { color: var(--text-muted); margin: 0; }

                .categories-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 24px;
                }

                .admin-card {
                    padding: 24px;
                    border-radius: 20px;
                    border: 1px solid var(--glass-border);
                    background: rgba(255, 255, 255, 0.02);
                }

                .form-head { display: flex; justify-content: space-between; margin-bottom: 16px; }
                .close-btn { background: none; border: none; color: #aaa; cursor: pointer; }

                .card-header-actions {
                    display: flex; justify-content: space-between; align-items: center;
                    margin-bottom: 16px;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    padding-bottom: 12px;
                }
                
                .category-title-input {
                    background: transparent;
                    border: none;
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: white;
                    width: 100%;
                }
                .category-title-input:focus { outline: none; border-bottom: 1px solid var(--primary-color); }

                .delete-btn {
                    background: rgba(239, 68, 68, 0.1);
                    color: #ef4444;
                    border: none;
                    padding: 6px;
                    border-radius: 6px;
                    cursor: pointer;
                }

                .form-group { margin-bottom: 16px; }
                .form-group label { display: block; margin-bottom: 8px; font-size: 0.85rem; color: #888; }
                .form-group input, .form-group textarea {
                    width: 100%; padding: 10px;
                    background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px; color: white;
                    font-family: inherit; font-size: 0.9rem;
                }
                .form-group input:focus, .form-group textarea:focus {
                    outline: none; border-color: var(--primary-color);
                }

                .tags-preview {
                    display: flex; flex-wrap: wrap; gap: 8px;
                }
                .skill-tag {
                    font-size: 0.75rem;
                    padding: 2px 8px;
                    background: rgba(255,255,255,0.05);
                    border-radius: 4px;
                    color: #ccc;
                }

                .btn-primary {
                    background: var(--primary-color); color: white; border: none;
                    padding: 8px 16px; border-radius: 8px; font-weight: 600;
                    cursor: pointer; display: flex; align-items: center; gap: 8px;
                }
                .big-save { padding: 12px 24px; font-size: 1rem; box-shadow: 0 4px 20px rgba(0,0,0,0.3); }

                .floating-save {
                    position: fixed; bottom: 32px; right: 32px; z-index: 100;
                }
            `}</style>
        </div>
    );
};

export default SkillsManager;
