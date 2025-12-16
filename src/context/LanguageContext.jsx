import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
    fr: {
        nav: {
            home: 'Accueil',
            about: 'À propos',
            services: 'Services',
            portfolio: 'Projets',
            contact: 'Contact',
            cv: 'Mon CV'
        },
        hero: {
            title_start: 'Créons des expériences',
            title_end: 'Digitales Uniques',
            subtitle: 'Développeur Full Stack | UI/UX Designer | Graphiste | Passionné IoT & IA',
            cta_projects: 'Voir mes projets',
            cta_contact: 'Me contacter'
        },
        about: {
            title: 'À propos de moi',
            role: 'Développeur Full Stack | UI/UX Designer | Graphiste | Passionné IoT & IA',
            desc1: 'Technicien supérieur en <strong>Génie Électrique et Informatique</strong>, je suis un développeur web & mobile (front/back) passionné par l’innovation et l’esthétique. J’allie technique et design pour créer des applications performantes et intuitives.',
            desc2: '<strong>Designer UI/UX</strong>, je conçois des interfaces modernes et centrées sur l’utilisateur. <strong>Graphiste</strong> également, je réalise des visuels impactants : affiches, flyers, présentations, etc.',
            desc3: 'Passionné par <strong>l’IoT, l’Arduino et l’intelligence artificielle</strong>, je suis animé par la rigueur, le souci du détail et la recherche de la perfection dans tout ce que je crée.',
            stats: {
                exp: 'Années d\'Expérience',
                projects: 'Projets Réalisés',
                engagement: 'Engagement'
            },
            download_cv: 'Télécharger mon CV'
        },
        services: {
            title: 'Mes Services',
            items: [
                {
                    title: "Développement Web",
                    description: "Sites performants, responsives et modernes utilisant les dernières technologies (React, Next.js, etc.)."
                },
                {
                    title: "UI/UX Design",
                    description: "Interfaces intuitives et esthétiques centrées sur l'expérience utilisateur et l'accessibilité."
                },
                {
                    title: "Design Graphique",
                    description: "Identité visuelle forte, logos, et supports de communication pour votre marque."
                }
            ]
        },
        portfolio: {
            title: 'Mes Projets'
        },
        contact: {
            title: 'Me Contacter',
            form: {
                name: 'Nom complet',
                phone: 'Téléphone (Optionnel)',
                email: 'Email',
                subject: 'Sujet',
                message: 'Message',
                send: 'Envoyer',
                sending: 'Envoi en cours...',
                success: 'Message envoyé avec succès !',
                error: 'Erreur lors de l\'envoi. Veuillez réessayer.'
            }
        }
    },
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            services: 'Services',
            portfolio: 'Projects',
            contact: 'Contact',
            cv: 'My Resume'
        },
        hero: {
            title_start: 'Creating Unique',
            title_end: 'Digital Experiences',
            subtitle: 'Full Stack Developer | UI/UX Designer | Graphic Designer | IoT & AI Enthusiast',
            cta_projects: 'View My Work',
            cta_contact: 'Contact Me'
        },
        about: {
            title: 'About Me',
            role: 'Full Stack Developer | UI/UX Designer | Graphic Designer | IoT & AI Enthusiast',
            desc1: 'Higher Technician in <strong>Electrical and Computer Engineering</strong>, I am a web & mobile developer (front/back) passionate about innovation and aesthetics. I combine technique and design to create high-performance and intuitive applications.',
            desc2: 'As a <strong>UI/UX Designer</strong>, I design modern and user-centered interfaces. Also a <strong>Graphic Designer</strong>, I create impactful visuals: posters, flyers, presentations, etc.',
            desc3: 'Passionate about <strong>IoT, Arduino and Artificial Intelligence</strong>, I am driven by rigor, attention to detail and the search for perfection in everything I create.',
            stats: {
                exp: 'Years Experience',
                projects: 'Projects Completed',
                engagement: 'Commitment'
            },
            download_cv: 'Download My Resume'
        },
        services: {
            title: 'My Services',
            items: [
                {
                    title: "Web Development",
                    description: "High-performance, responsive, and modern websites using the latest technologies (React, Next.js, etc.)."
                },
                {
                    title: "UI/UX Design",
                    description: "Intuitive and aesthetic interfaces focused on user experience and accessibility."
                },
                {
                    title: "Graphic Design",
                    description: "Strong visual identity, logos, and communication materials for your brand."
                }
            ]
        },
        portfolio: {
            title: 'My Projects'
        },
        contact: {
            title: 'Contact Me',
            form: {
                name: 'Full Name',
                phone: 'Phone (Optional)',
                email: 'Email',
                subject: 'Subject',
                message: 'Message',
                send: 'Send',
                sending: 'Sending...',
                success: 'Message sent successfully!',
                error: 'Error sending message. Please try again.'
            }
        }
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('fr');

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'fr' ? 'en' : 'fr'));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
