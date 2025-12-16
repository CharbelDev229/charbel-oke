import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Toggle theme"
    >
      <div className={`icon-container ${theme === 'dark' ? 'show-moon' : 'show-sun'}`}>
        {/* Sun Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon sun">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>

        {/* Moon Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon moon">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </div>

      <style>{`
        .theme-toggle {
          background: transparent;
          border: 1px solid var(--glass-border);
          color: var(--text-color);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          overflow: hidden;
          position: relative;
        }
        .theme-toggle:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--primary-color);
        }
        .icon-container {
          position: relative;
          width: 20px;
          height: 20px;
        }
        .icon {
          position: absolute;
          top: 0;
          left: 0;
          transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        /* Show Sun (Light Mode active) */
        .show-sun .sun {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        .show-sun .moon {
          transform: translateY(30px) rotate(90deg);
          opacity: 0;
        }
        /* Show Moon (Dark Mode active) */
        .show-moon .moon {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        .show-moon .sun {
          transform: translateY(-30px) rotate(-90deg);
          opacity: 0;
        }
      `}</style>
    </button>
  );
};

export default ThemeToggle;
