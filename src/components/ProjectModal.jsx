import React, { useEffect } from 'react';
import { X, ExternalLink, Github } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleBackdropClick = (e) => {
        if (e.target.className === 'modal-backdrop') {
            onClose();
        }
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content glass animate-scale-in">
                <button className="close-btn" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="modal-image-wrapper">
                    <img src={project.image} alt={project.title} />
                    <div className="image-overlay"></div>
                </div>

                <div className="modal-body">
                    <div className="modal-header">
                        <span className="modal-category">{project.category}</span>
                        <h2>{project.title}</h2>
                    </div>

                    <div className="modal-description">
                        <p className="main-desc">{project.description}</p>

                        <div className="full-content">
                            <h3>À propos du projet</h3>
                            <p>{project.content || "Détails à venir..."}</p>
                        </div>

                        {/* Technologies Tags (Simulated since not in DataContext yet, or we assume they might be added) */}
                        <div className="tech-stack">
                            <h3>Technologies</h3>
                            <div className="tags">
                                {['React', 'Node.js', 'CSS Modules'].map((tech, i) => (
                                    <span key={i} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <a href="#" className="btn-modal primary">
                            Voir le site <ExternalLink size={16} />
                        </a>
                        <a href="#" className="btn-modal secondary">
                            Code Source <Github size={16} />
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
                .modal-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(8px);
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    animation: fadeIn 0.3s ease;
                }

                .modal-content {
                    background: #0f1014;
                    width: 100%;
                    max-width: 900px;
                    max-height: 90vh;
                    overflow-y: auto;
                    border-radius: 24px;
                    position: relative;
                    border: 1px solid rgba(255,255,255,0.1);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }

                .close-btn {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: rgba(0,0,0,0.5);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: white;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 10;
                    transition: all 0.2s;
                }
                .close-btn:hover {
                    background: white;
                    color: black;
                }

                .modal-image-wrapper {
                    width: 100%;
                    height: 350px;
                    position: relative;
                }
                .modal-image-wrapper img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .image-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, transparent 0%, #0f1014 100%);
                }

                .modal-body {
                    padding: 40px;
                    margin-top: -60px; /* Overlap image */
                    position: relative;
                    z-index: 2;
                }

                .modal-header {
                    margin-bottom: 30px;
                }
                .modal-category {
                    color: var(--primary-color);
                    font-size: 0.9rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 10px;
                    display: block;
                }
                .modal-header h2 {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: white;
                    line-height: 1.1;
                }

                .modal-description .main-desc {
                    font-size: 1.2rem;
                    color: var(--text-color);
                    margin-bottom: 40px;
                    line-height: 1.6;
                }

                .full-content h3, .tech-stack h3 {
                    font-size: 1.2rem;
                    color: white;
                    margin-bottom: 15px;
                    font-weight: 600;
                }
                .full-content p {
                    color: var(--text-muted);
                    line-height: 1.7;
                    margin-bottom: 30px;
                }

                .tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-bottom: 40px;
                }
                .tech-tag {
                    padding: 6px 14px;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 50px;
                    font-size: 0.85rem;
                    color: var(--text-muted);
                }

                .modal-footer {
                    display: flex;
                    gap: 15px;
                    border-top: 1px solid rgba(255,255,255,0.1);
                    padding-top: 30px;
                }
                .btn-modal {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 24px;
                    border-radius: 12px;
                    font-weight: 500;
                    text-decoration: none;
                }
                .btn-modal.primary {
                    background: white;
                    color: black;
                }
                .btn-modal.secondary {
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.2);
                    color: white;
                }

                @keyframes scaleIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in {
                    animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }

                @media (max-width: 768px) {
                    .modal-image-wrapper { height: 250px; }
                    .modal-header h2 { font-size: 2rem; }
                    .modal-body { padding: 20px; }
                }
            `}</style>
        </div>
    );
};

export default ProjectModal;
