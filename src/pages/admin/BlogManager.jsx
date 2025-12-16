import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const BlogManager = () => {
    const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useData();
    const [editingId, setEditingId] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    const initialFormState = {
        title: '',
        excerpt: '',
        content: '',
        image: ''
    };

    const [formData, setFormData] = useState(initialFormState);

    const startEdit = (post) => {
        setEditingId(post.id);
        setFormData(post);
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
            addBlogPost(formData);
            toast.success('Article publié !');
        } else {
            updateBlogPost(editingId, formData);
            toast.success('Article mis à jour !');
        }
        handleCancel();
    };

    const handleDelete = (id) => {
        if (window.confirm('Supprimer cet article ?')) {
            deleteBlogPost(id);
            toast.success('Article supprimé.');
        }
    };

    return (
        <div className="admin-page fade-in">
            <div className="admin-header">
                <div>
                    <h1>Gestion du Blog</h1>
                    <p className="subtitle">Rédigez et gérez vos articles de blog.</p>
                </div>
                {!isAdding && !editingId && (
                    <button onClick={startAdd} className="btn-primary">
                        <Plus size={18} />
                        Nouvel Article
                    </button>
                )}
            </div>

            {(isAdding || editingId) && (
                <div className="editor-card glass fade-in-up">
                    <div className="editor-header">
                        <h3>{isAdding ? 'Nouvel Article' : 'Modifier l\'article'}</h3>
                        <button onClick={handleCancel} className="close-btn">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="form-grid">
                        <div className="form-group span-2">
                            <label>Titre de l'article</label>
                            <input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Titre accrocheur..."
                            />
                        </div>

                        <div className="form-group span-2">
                            <label>Extrait</label>
                            <textarea
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                rows={2}
                                placeholder="Bref résumé pour la carte..."
                            />
                        </div>

                        <div className="form-group span-2">
                            <label>Contenu Complet</label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                rows={10}
                                placeholder="Contenu de votre article..."
                            />
                        </div>
                    </div>

                    <div className="editor-footer">
                        <button onClick={handleCancel} className="btn-secondary">Annuler</button>
                        <button onClick={handleSave} className="btn-primary">
                            <Save size={18} />
                            Publier
                        </button>
                    </div>
                </div>
            )}

            {/* Liste des Articles */}
            <div className="blog-list">
                {blogPosts.map((post) => (
                    <div key={post.id} className="blog-item glass">
                        <div className="blog-info">
                            <h4>{post.title}</h4>
                            <span className="blog-date">{post.date}</span>
                            <p className="blog-excerpt">{post.excerpt}</p>
                        </div>

                        <div className="action-buttons">
                            <button onClick={() => startEdit(post)} className="btn-icon">
                                <Pencil size={18} />
                            </button>
                            <button onClick={() => handleDelete(post.id)} className="btn-icon delete">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .admin-page {
                    max-width: 1000px;
                    margin: 0 auto;
                }
                .admin-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 32px;
                }
                h1 { margin: 0 0 4px 0; font-size: 1.8rem; }
                .subtitle { color: var(--text-muted); margin: 0; }

                /* Editor */
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
                    margin-bottom: 24px;
                }
                .editor-header h3 { margin: 0; font-size: 1.4rem; }
                .close-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; }

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
                .form-group input, .form-group textarea {
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
                    padding: 10px 24px;
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
                    padding: 10px 24px;
                    border-radius: 8px;
                    cursor: pointer;
                }

                /* Blog List */
                .blog-list {
                    display: grid;
                    gap: 16px;
                }
                .blog-item {
                    padding: 24px;
                    border-radius: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border: 1px solid var(--glass-border);
                    background: rgba(255,255,255,0.02);
                    transition: 0.2s;
                }
                .blog-item:hover {
                    background: rgba(255,255,255,0.04);
                }
                .blog-info h4 { margin: 0 0 8px 0; font-size: 1.1rem; }
                .blog-date { font-size: 0.85rem; color: var(--primary-color); display: block; margin-bottom: 8px; }
                .blog-excerpt { color: var(--text-muted); font-size: 0.9rem; margin: 0; max-width: 600px; }

                .action-buttons {
                    display: flex;
                    gap: 8px;
                }
                .btn-icon {
                    width: 36px;
                    height: 36px;
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

                @media(max-width: 768px) {
                    .blog-item { flex-direction: column; align-items: flex-start; gap: 20px; }
                    .action-buttons { width: 100%; justify-content: flex-end; }
                }
            `}</style>
        </div>
    );
};

export default BlogManager;
