import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    FolderKanban,
    LogOut,
    PenTool,
    Home,
    User,
    Zap,
    Mail,
    Menu,
    X,
    ChevronDown,
    Code2
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminLayout = () => {
    const { logout } = useData();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { icon: LayoutDashboard, label: 'Tableau de bord', path: '/admin' },
        { icon: FolderKanban, label: 'Projets', path: '/admin/projects' },
        { icon: PenTool, label: 'Blog', path: '/admin/blog' },
    ];

    const sectionItems = [
        { icon: Home, label: 'Hero Section', path: '/admin/hero' },
        { icon: User, label: 'À Propos', path: '/admin/about' },
        { icon: Code2, label: 'Compétences', path: '/admin/skills' },
        { icon: Zap, label: 'Services', path: '/admin/services' },
        { icon: Mail, label: 'Contact', path: '/admin/contact' },
    ];

    const NavLink = ({ item }) => {
        const isActive = location.pathname === item.path;
        return (
            <li>
                <Link
                    to={item.path}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                </Link>
            </li>
        );
    };

    return (
        <div className="admin-layout">
            {/* Mobile Header */}
            <header className="mobile-header lg-hidden">
                <div className="logo">Admin Panel</div>
                <button
                    className="menu-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </header>

            {/* Sidebar */}
            <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>Portfolio Admin</h2>
                    <p>Gestion de contenu</p>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-group">
                        <span className="group-label">Général</span>
                        <ul>
                            {navItems.map((item) => <NavLink key={item.path} item={item} />)}
                        </ul>
                    </div>

                    <div className="nav-group">
                        <span className="group-label">Sections du Site</span>
                        <ul>
                            {sectionItems.map((item) => <NavLink key={item.path} item={item} />)}
                        </ul>
                    </div>
                </nav>

                <div className="sidebar-footer">
                    <button onClick={logout} className="logout-btn">
                        <LogOut size={20} />
                        <span>Déconnexion</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <Outlet />
            </main>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <style>{`
                .admin-layout {
                    display: flex;
                    min-height: 100vh;
                    background: #000;
                    position: relative;
                }

                /* Sidebar */
                .sidebar {
                    width: 280px;
                    background: #050505;
                    border-right: 1px solid rgba(255,255,255,0.08);
                    display: flex;
                    flex-direction: column;
                    position: fixed;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 50;
                    transition: transform 0.3s ease;
                }

                .sidebar-header {
                    padding: 32px 24px;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .sidebar-header h2 {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin: 0;
                    letter-spacing: -0.5px;
                }
                .sidebar-header p {
                    margin: 4px 0 0 0;
                    font-size: 0.85rem;
                    color: var(--text-muted);
                }

                .sidebar-nav {
                    flex: 1;
                    padding: 24px;
                    overflow-y: auto;
                }

                .nav-group {
                    margin-bottom: 32px;
                }

                .group-label {
                    display: block;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    color: var(--text-muted);
                    margin-bottom: 12px;
                    padding-left: 12px;
                    font-weight: 600;
                    letter-spacing: 1px;
                }

                .sidebar-nav ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .nav-link {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px;
                    border-radius: 12px;
                    color: #8899a6;
                    text-decoration: none;
                    transition: all 0.2s;
                    margin-bottom: 4px;
                    font-size: 0.95rem;
                }
                .nav-link:hover {
                    background: rgba(255,255,255,0.03);
                    color: white;
                }
                .nav-link.active {
                    background: rgba(59, 130, 246, 0.1);
                    color: var(--primary-color);
                    font-weight: 500;
                }

                .sidebar-footer {
                    padding: 24px;
                    border-top: 1px solid rgba(255,255,255,0.05);
                }

                .logout-btn {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px;
                    border-radius: 12px;
                    background: rgba(239, 68, 68, 0.1);
                    color: #ef4444;
                    border: none;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .logout-btn:hover {
                    background: rgba(239, 68, 68, 0.2);
                }

                /* Main Content */
                .main-content {
                    flex: 1;
                    margin-left: 280px;
                    padding: 40px;
                    overflow-x: hidden;
                    width: 100%;
                }

                /* Mobile Header */
                .mobile-header {
                    display: none;
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .sidebar {
                        transform: translateX(-100%);
                    }
                    .sidebar.open {
                        transform: translateX(0);
                    }
                    .main-content {
                        margin-left: 0;
                        padding-top: 80px;
                    }
                    
                    .mobile-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 16px 24px;
                        background: rgba(0,0,0,0.8);
                        backdrop-filter: blur(10px);
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        z-index: 40;
                        border-bottom: 1px solid var(--glass-border);
                    }
                    .menu-toggle {
                        background: none;
                        border: none;
                        color: white;
                        padding: 8px;
                    }
                    
                    .sidebar-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0,0,0,0.5);
                        z-index: 45;
                        backdrop-filter: blur(2px);
                    }
                }
            `}</style>
        </div>
    );
};

export default AdminLayout;
