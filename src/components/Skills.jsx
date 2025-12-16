import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useData } from '../context/DataContext';

const Skills = () => {
    const { siteContent } = useData();
    const { skills } = siteContent;
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);
    const sectionRef = useRef(null);

    // Flatten and sort skills
    const allSkills = useMemo(() => {
        if (!skills) return [];
        return skills
            .flatMap(cat => cat.items)
            .sort((a, b) => a.localeCompare(b));
    }, [skills]);

    // Handle Scroll for Animation
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const sectionHeight = sectionRef.current.offsetHeight;
            const windowHeight = window.innerHeight;

            // Calculate progress through the section
            // Sticky behavior typically keeps top at 0 for a while
            // We want the animation to play while the user scrolls through the tall section

            const start = 0;
            const end = - (sectionHeight - windowHeight);

            const scrollY = rect.top;

            // If we are within the scrollable area
            if (scrollY <= 0 && scrollY >= end) {
                // progress goes from 0 to 1
                const progress = Math.abs(scrollY) / (sectionHeight - windowHeight);
                const index = Math.min(
                    Math.floor(progress * allSkills.length),
                    allSkills.length - 1
                );
                setActiveIndex(index);
            } else if (scrollY > 0) {
                // Above the section
                setActiveIndex(0);
            } else if (scrollY < end) {
                // Below the section
                setActiveIndex(allSkills.length - 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [allSkills.length]);


    // Helper to get devicon URL
    const getIconUrl = (techName) => {
        const map = {
            "html": "html5", "css": "css3", "js": "javascript", "react": "react",
            "node.js": "nodejs", "vue.js": "vuejs", "laravel": "laravel", "php": "php",
            "python": "python", "flutter": "flutter", "figma": "figma", "git": "git",
            "github": "github", "gitlab": "gitlab", "arduino": "arduino", "c++": "cplusplus",
            "bootstrap": "bootstrap", "tailwind css": "tailwindcss", "flask": "flask",
            "wordpress": "wordpress", "numpy": "numpy", "pandas": "pandas",
            "matplotlib": "matplotlib", "mysql": "mysql", "mongodb": "mongodb", "docker": "docker",
            "canva": "canva"
        };
        const lower = techName.toLowerCase();
        let key = Object.keys(map).find(k => lower.includes(k));
        let iconName = key ? map[key] : null;
        if (!iconName) return null;
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`;
    };

    if (!allSkills.length) return null;

    return (
        <section id="skills" className="skills-scroll-section" ref={sectionRef}>
            <div className="sticky-wrapper">
                <div className="container center-content">
                    <div className="skills-display-card glass">
                        <div className="skill-content fade-in">
                            <div className="counter">
                                {activeIndex + 1} / {allSkills.length}
                            </div>

                            <div className="icon-large-container">
                                {getIconUrl(allSkills[activeIndex]) ? (
                                    <img
                                        src={getIconUrl(allSkills[activeIndex])}
                                        alt={allSkills[activeIndex]}
                                        className="skill-icon-large"
                                        key={allSkills[activeIndex]} // Force re-render for animation
                                    />
                                ) : (
                                    <div className="skill-dot-large" />
                                )}
                            </div>

                            <h2 className="current-skill-name" key={`text-${allSkills[activeIndex]}`}>
                                {allSkills[activeIndex]}
                            </h2>

                            <p className="instruction-text">
                                Fait défiler pour explorer...
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .skills-scroll-section {
                    height: 400vh; /* Make section very tall to allow scrolling */
                    position: relative;
                }

                .sticky-wrapper {
                    position: sticky;
                    top: 0;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                }

                .center-content {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }

                .skills-display-card {
                    padding: 60px;
                    width: 100%;
                    max-width: 500px;
                    aspect-ratio: 1; /* Square card */
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    background: var(--glass-bg); /* Use thematic bg */
                    border: 1px solid var(--glass-border);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                    border-radius: 32px;
                    position: relative;
                    transition: all 0.3s ease;
                }
                
                .counter {
                    position: absolute;
                    top: 24px;
                    right: 24px;
                    font-family: monospace;
                    color: var(--text-muted);
                    font-size: 0.9rem;
                    background: rgba(255,255,255,0.05);
                    padding: 4px 8px;
                    border-radius: 8px;
                }

                .icon-large-container {
                    width: 140px;
                    height: 140px;
                    margin-bottom: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .skill-icon-large {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .skill-dot-large {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: var(--primary-color);
                }

                .current-skill-name {
                    font-size: 3.5rem;
                    font-weight: 800;
                    margin: 0;
                    background: linear-gradient(135deg, var(--text-color) 0%, var(--text-muted) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: slideUp 0.3s ease-out;
                    line-height: 1.1;
                }

                .instruction-text {
                    margin-top: 32px;
                    font-size: 0.9rem;
                    color: var(--text-muted);
                    opacity: 0.7;
                    animation: bounce 2s infinite;
                }

                @keyframes popIn {
                    0% { transform: scale(0.5); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes slideUp {
                    0% { transform: translateY(20px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(5px); }
                }

                @media (max-width: 768px) {
                   .skills-display-card {
                        padding: 30px;
                        max-width: 90%;
                        aspect-ratio: auto;
                        min-height: 400px;
                   }
                   .current-skill-name {
                        font-size: 2.5rem;
                   }
                   .icon-large-container {
                        width: 100px;
                        height: 100px;
                   }
                }
            `}</style>
        </section>
    );
};

export default Skills;
