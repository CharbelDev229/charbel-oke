import React, { createContext, useContext, useState, useEffect } from 'react';

// Images importées pour les données par défaut
import imgEcommerce from '../assets/portfolio/ZenBook Duo 14.png';
import imgMobile from '../assets/portfolio/iPhone 16 (9).png';
import imgDashboard from '../assets/portfolio/ZenBook Duo 14 (1).png';
import imgBranding from '../assets/portfolio/Group 1597885246.png';
import imgWeb from '../assets/portfolio/ZenBook Duo 14 (2).png';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    // --- STATE INITIAL (Données par défaut) ---
    // Note: Empty strings allow components to fallback to LanguageContext (i18n)
    const initialContent = {
        hero: {
            title: "",
            subtitle: "",
            cta: ""
        },
        about: {
            bio: "",
            // Skills moved to their own section, keeping simple list here just in case or for legacy
            skills: ["React", "Node.js", "Design System", "UI/UX"]
        },
        skills: [
            {
                id: 1,
                category: "Développement Web",
                items: ["HTML", "CSS", "Bootstrap", "PHP", "WordPress", "Flask", "React", "Tailwind CSS", "Vue.js", "Laravel"]
            },
            {
                id: 2,
                category: "Développement Mobile",
                items: ["Flutter"]
            },
            {
                id: 3,
                category: "Data Science & Analyse",
                items: ["NumPy", "pandas", "Matplotlib"]
            },
            {
                id: 4,
                category: "Électronique",
                items: ["Arduino", "Microcontrôleur"]
            },
            {
                id: 5,
                category: "UI/UX Design",
                items: ["Figma (Prototypage, Auto-layout)", "Canva"]
            },
            {
                id: 6,
                category: "Programmation",
                items: ["Python", "C++"]
            },
            {
                id: 7,
                category: "Versioning & Ops",
                items: ["Git", "GitHub", "GitLab"]
            },
            {
                id: 8,
                category: "Architecture",
                items: ["Clean Architecture"]
            }
        ],
        services: [] // Default services are handled by translation files unless overridden here
    };

    const initialProjects = [
        {
            id: 1,
            title: "Projet E-commerce",
            category: "Web Development",
            description: "Plateforme complète avec panier, paiement et dashboard admin.",
            content: "Détails complets du projet E-commerce. Technologies utilisées : React, Node, Stripe...",
            image: imgEcommerce,
            size: "large"
        },
        {
            id: 2,
            title: "App Mobile Finance",
            category: "UI/UX Design",
            description: "Design système et prototypage haute-fidélité sur Figma.",
            image: imgMobile,
            size: "small"
        },
        {
            id: 3,
            title: "Branding Tech & Identité",
            category: "Graphic Design",
            description: "Identité visuelle moderne pour une startup IA (Logo, Affiches).",
            image: imgBranding,
            size: "small"
        },
        {
            id: 4,
            title: "Dashboard Admin",
            category: "Full Stack",
            description: "Interface de gestion pour le suivi des KPIs en temps réel.",
            image: imgDashboard,
            size: "large"
        },
        {
            id: 5,
            title: "Site Vitrine Corporate",
            category: "Web Design",
            description: "Site institutionnel pour une entreprise de BTP.",
            image: imgWeb,
            size: "small"
        }
    ];

    const initialBlogPosts = [
        {
            id: 1,
            title: "L'avenir du Web Design en 2025",
            excerpt: "Tendances majeures : du Glassmorphism à l'IA générative.",
            content: "Contenu complet de l'article sur le web design...",
            date: "2024-12-15",
            // image: imgDashboard 
        },
        {
            id: 2,
            title: "Optimiser React pour la performance",
            excerpt: "Astuces pour réduire le bundle size et améliorer le TTI.",
            content: "Guide technique sur React.Memo, useMemo, et le code splitting...",
            date: "2024-11-20",
            // image: imgWeb 
        }
    ];

    // Chargement depuis localStorage
    const [projects, setProjects] = useState(() => {
        const saved = localStorage.getItem('portfolio_projects');
        return saved ? JSON.parse(saved) : initialProjects;
    });

    const [blogPosts, setBlogPosts] = useState(() => {
        const saved = localStorage.getItem('portfolio_blog');
        return saved ? JSON.parse(saved) : initialBlogPosts;
    });

    const [siteContent, setSiteContent] = useState(() => {
        // Versioned key to reset content for translation fix
        const saved = localStorage.getItem('portfolio_content_v2');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Merge initialContent to ensure new fields (like skills) are present if missing in saved data
            return { ...initialContent, ...parsed, skills: parsed.skills || initialContent.skills };
        }
        return initialContent;
    });

    const [isAdmin, setIsAdmin] = useState(() => {
        return localStorage.getItem('is_admin') === 'true';
    });

    // --- EFFETS ---
    useEffect(() => { localStorage.setItem('portfolio_projects', JSON.stringify(projects)); }, [projects]);
    useEffect(() => { localStorage.setItem('portfolio_blog', JSON.stringify(blogPosts)); }, [blogPosts]);
    useEffect(() => { localStorage.setItem('portfolio_content_v2', JSON.stringify(siteContent)); }, [siteContent]);
    useEffect(() => { localStorage.setItem('is_admin', isAdmin); }, [isAdmin]);

    // --- ACTIONS ---
    const login = (password) => {
        if (password === 'admin123') { setIsAdmin(true); return true; }
        return false;
    };
    const logout = () => setIsAdmin(false);

    // Projects Actions
    const addProject = (p) => {
        const newP = { ...p, id: Date.now() };
        setProjects([...projects, newP]);
    };
    const updateProject = (id, d) => setProjects(projects.map(p => p.id === id ? { ...p, ...d } : p));
    const deleteProject = (id) => setProjects(projects.filter(p => p.id !== id));

    // Blog Actions
    const addBlogPost = (p) => {
        const newP = { ...p, id: Date.now(), date: new Date().toISOString().split('T')[0] };
        setBlogPosts([...blogPosts, newP]);
    };
    const updateBlogPost = (id, d) => setBlogPosts(blogPosts.map(p => p.id === id ? { ...p, ...d } : p));
    const deleteBlogPost = (id) => setBlogPosts(blogPosts.filter(p => p.id !== id));

    // Content Actions
    const updateSiteContent = (section, data) => setSiteContent(prev => ({ ...prev, [section]: data }));

    const value = {
        projects, addProject, updateProject, deleteProject,
        blogPosts, addBlogPost, updateBlogPost, deleteBlogPost,
        siteContent, updateSiteContent,
        isAdmin, login, logout
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};
