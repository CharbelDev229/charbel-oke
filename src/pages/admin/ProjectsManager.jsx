import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Pencil, Trash2, X, Save, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const ProjectsManager = () => {
    const { projects, addProject, updateProject, deleteProject } = useData();
    const [editingId, setEditingId] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Initial state for form
    const initialFormState = {
        title: '',
        category: '',
        description: '',
        size: 'small',
        image: ''
    };

    const [formData, setFormData] = useState(initialFormState);

    const startEdit = (project) => {
        setEditingId(project.id);
        setFormData(project);
        setIsAdding(false);
    };

    const startAdd = () => {
        setEditingId(null);
        setFormData(initialFormState);
        setIsAdding(true);
    };

    const handleCancel = () => {
        setEditingId(null);
        setIsAdding(false);
        setFormData(initialFormState);
    };

    const handleSave = () => {
        if (isAdding) {
            addProject(formData);
            toast.success('Projet ajouté !');
        } else {
            updateProject(editingId, formData);
            toast.success('Projet mis à jour !');
        }
        handleCancel();
    };

    const handleDelete = (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
            deleteProject(id);
            toast.success('Projet supprimé.');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="projects-manager fade-in">
            <div className="page-header">
                <div>
                    <h1>Projets</h1>
                    <p className="subtitle">Gérez le portfolio et vos réalisations.</p>
                </div>
                {!isAdding && !editingId && (
                    <button onClick={startAdd} className="btn-primary">
                        <Plus size={18} />
                        Nouveau Projet
                    </button>
                )}
            </div>

            {/* Search Bar */}
            {!isAdding && !editingId && (
                <div className="toolbar glass">
                    <div className="search-box">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Rechercher un projet..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {/* Add Filter buttons here if needed */}
                </div>
            )}

            {/* Form */}
            {(isAdding || editingId) && (
                <div className="editor-card glass fade-in-up">
                    <div className="editor-header">
                        <h3>{isAdding ? 'Nouveau Projet' : 'Éditer le Projet'}</h3>
                        <button onClick={handleCancel} className="close-btn">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="form-grid">
                        <div className="form-group span-2">
                            <label>Titre du projet</label>
                            <input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Nom du projet"
                            />
                        </div>

                        <div className="form-group">
                            <label>Catégorie</label>
                            <input
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                placeholder="Ex: Web Design, Mobile..."
                            />
                        </div>

                        <div className="form-group">
                            <label>Taille (Grid)</label>
                            <select
                                value={formData.size}
                                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                            >
                                <option value="small">Petit (1 colonne)</option>
                                <option value="large">Grand (2 colonnes)</option>
                            </select>
                        </div>

                        <div className="form-group span-2">
                            <label>Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                            />
                        </div>

                        <div className="form-group span-2">
                            <label>Image de couverture</label>
                            <div className="image-uploader">
                                {formData.image && (
                                    <div className="preview-img">
                                        <img src={formData.image} alt="Preview" />
                                    </div>
                                )}
                                <input type="file" onChange={handleImageChange} />
                            </div>
                        </div>
                    </div>

                    <div className="editor-footer">
                        <button onClick={handleCancel} className="btn-secondary">Annuler</button>
                        <button onClick={handleSave} className="btn-primary">
                            <Save size={18} />
                            Enregistrer
                        </button>
                    </div>
                </div>
            )}

            {/* Table / List */}
            {!isAdding && !editingId && (
                <div className="table-container glass">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Aperçu</th>
                                <th>Titre</th>
                                <th>Catégorie</th>
                                <th>Taille</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProjects.map((project) => (
                                <tr key={project.id}>
                                    <td>
                                        <div className="table-thumb">
                                            <img src={project.image} alt="" />
                                        </div>
                                    </td>
                                    <td className="font-bold">{project.title}</td>
                                    <td>
                                        <span className="badge">{project.category}</span>
                                    </td>
                                    <td style={{ textTransform: 'capitalize', color: '#888' }}>{project.size}</td>
                                    <td style={{ textAlign: 'right' }}>
                                        <div className="action-buttons">
                                            <button onClick={() => startEdit(project)} className="btn-icon">
                                                <Pencil size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(project.id)} className="btn-icon delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <style>{`
                .projects-manager {
                    max-width: 1200px;
                }
                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 32px;
                }
                h1 { margin: 0 0 4px 0; font-size: 1.8rem; }
                .subtitle { color: var(--text-muted); margin: 0; }

                .toolbar {
                    padding: 16px;
                    border-radius: 12px;
                    margin-bottom: 24px;
                    border: 1px solid var(--glass-border);
                    background: rgba(255,255,255,0.02);
                }
                .search-box {
                    display: flex;
                    align-items: center;
                    background: rgba(0,0,0,0.3);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px;
                    padding: 8px 12px;
                    max-width: 300px;
                }
                .search-icon { color: var(--text-muted); margin-right: 8px; }
                .search-box input {
                    background: none;
                    border: none;
                    color: white;
                    width: 100%;
                }
                .search-box input:focus { outline: none; }

                /* Table */
                .table-container {
                    border-radius: 16px;
                    border: 1px solid var(--glass-border);
                    background: rgba(10, 10, 10, 0.6);
                    overflow: hidden;
                }
                .data-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .data-table th {
                    text-align: left;
                    padding: 16px 24px;
                    color: var(--text-muted);
                    font-weight: 500;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    font-size: 0.9rem;
                }
                .data-table td {
                    padding: 16px 24px;
                    border-bottom: 1px solid rgba(255,255,255,0.03);
                }
                .data-table tr:last-child td { border-bottom: none; }
                .data-table tr:hover {
                    background: rgba(255,255,255,0.02);
                }

                .table-thumb {
                    width: 50px;
                    height: 40px;
                    border-radius: 6px;
                    overflow: hidden;
                    background: #222;
                }
                .table-thumb img { width: 100%; height: 100%; object-fit: cover; }
                
                .font-bold { font-weight: 600; }
                .badge {
                    background: rgba(59, 130, 246, 0.1);
                    color: #60a5fa;
                    padding: 4px 10px;
                    border-radius: 100px;
                    font-size: 0.8rem;
                }

                .action-buttons {
                    display: flex;
                    justify-content: flex-end;
                    gap: 8px;
                }
                .btn-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    border: none;
                    background: rgba(255,255,255,0.05);
                    color: var(--text-muted);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }
                .btn-icon:hover { background: rgba(255,255,255,0.1); color: white; }
                .btn-icon.delete:hover { background: #ef4444; color: white; }

                /* Editor Card */
                .editor-card {
                    padding: 32px;
                    border-radius: 20px;
                    border: 1px solid var(--glass-border);
                    background: #0f1014;
                    margin-bottom: 40px;
                }
                .editor-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 32px;
                }
                .editor-header h3 { margin: 0; font-size: 1.4rem; }
                .close-btn {
                    background: none;
                    border: none;
                    color: var(--text-muted);
                    cursor: pointer;
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 24px;
                }
                .span-2 { grid-column: span 2; }
                
                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    color: #ccc;
                    font-size: 0.9rem;
                }
                .form-group input, .form-group textarea, .form-group select {
                    width: 100%;
                    padding: 12px;
                    border-radius: 8px;
                    border: 1px solid rgba(255,255,255,0.1);
                    background: rgba(0,0,0,0.4);
                    color: white;
                    font-family: inherit;
                }
                .form-group input:focus, .form-group textarea:focus {
                    outline: none;
                    border-color: var(--primary-color);
                }

                .preview-img {
                    width: 100%;
                    height: 200px;
                    background: #111;
                    border-radius: 8px;
                    overflow: hidden;
                    margin-bottom: 12px;
                }
                .preview-img img { width: 100%; height: 100%; object-fit: contain; }

                .editor-footer {
                    margin-top: 32px;
                    display: flex;
                    justify-content: flex-end;
                    gap: 16px;
                }

                .btn-primary {
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .btn-secondary {
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.2);
                    color: #ccc;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                }

                @media(max-width: 768px) {
                    .form-grid { grid-template-columns: 1fr; }
                    .span-2 { grid-column: span 1; }
                }
            `}</style>
        </div>
    );
};

export default ProjectsManager;
