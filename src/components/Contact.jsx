import React, { useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Linkedin, Github, Facebook, Phone, Send } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();
  const form = useRef();

  const handleMailto = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const data = Object.fromEntries(formData);

    // Construct mailto link
    const subject = encodeURIComponent(data.subject || "Nouveau contact depuis le portfolio");
    const body = encodeURIComponent(
      `Nom: ${data.user_name}\nEmail: ${data.user_email}\n\nMessage:\n${data.message}`
    );

    // Open default mail client
    window.location.href = `mailto:charbeloke77@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="contact">
      <div className="container contact-container">

        {/* Left Side: Text Content */}
        <div className="contact-text">
          <span className="contact-label">[ {t.contact.title} ]</span>
          <h2 className="contact-headline">
            Prêt à donner vie à <br />
            <span className="gradient-text">votre projet ?</span>
          </h2>
          <p className="contact-subtext">
            Transformons vos idées en réalité digitale.
            Que ce soit pour un site web, une identité visuelle ou une application,
            je suis là pour vous accompagner.
          </p>

          <div className="contact-details">
            {/* Email */}
            <div className="detail-item">
              <div className="icon-box"><Mail size={20} /></div>
              <a href="mailto:charbeloke77@gmail.com">charbeloke77@gmail.com</a>
            </div>

            {/* Social Media Links */}
            <div className="social-links">
              <a href="https://www.linkedin.com/in/charbel-oke-4bbbbb282" target="_blank" rel="noopener noreferrer" className="social-btn linkedin">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/charbeloke" target="_blank" rel="noopener noreferrer" className="social-btn github">
                <Github size={20} />
              </a>
              <a href="https://www.facebook.com/charbel.oke.94/" target="_blank" rel="noopener noreferrer" className="social-btn facebook">
                <Facebook size={20} />
              </a>
              <a href="https://wa.me/2290196195843" target="_blank" rel="noopener noreferrer" className="social-btn whatsapp">
                <Phone size={20} />
              </a>
            </div>
            <p className="social-hint">Retrouvez-moi sur les réseaux !</p>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div className="contact-card glass">
          <form
            ref={form}
            onSubmit={handleMailto}
            className="contact-form"
          >
            <div className="form-group">
              <label>{t.contact.form.name}</label>
              <input type="text" name="user_name" placeholder="John Doe" required />
            </div>

            <div className="form-group">
              <label>{t.contact.form.email}</label>
              <input type="email" name="user_email" placeholder="email@exemple.com" required />
            </div>

            <div className="form-group">
              <label>{t.contact.form.subject}</label>
              <input type="text" name="subject" placeholder="Nouveau projet..." required />
            </div>

            <div className="form-group">
              <label>{t.contact.form.message}</label>
              <textarea name="message" rows="4" placeholder="Votre message..." required></textarea>
            </div>

            <button type="submit" className="submit-btn">
              {t.contact.form.send} <Send size={18} style={{ marginLeft: '8px' }} />
            </button>

            <p className="form-footer-text">
              En cliquant sur envoyer, votre client mail s'ouvrira pré-rempli.
            </p>
          </form>
        </div>

      </div>
      <style>{`
        .contact {
          padding: 100px 0;
          position: relative;
        }

        .contact-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .contact-label {
          color: var(--primary-color);
          font-family: monospace;
          margin-bottom: 20px;
          display: block;
          letter-spacing: 2px;
        }

        .contact-headline {
          font-size: 3.5rem;
          line-height: 1.1;
          margin-bottom: 30px;
          font-weight: 700;
        }
        
        .contact-subtext {
          font-size: 1.1rem;
          color: var(--text-muted);
          margin-bottom: 40px;
          max-width: 90%;
          line-height: 1.6;
        }

        .contact-details {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        .detail-item {
          display: flex;
          align-items: center;
          gap: 15px;
          font-size: 1.1rem;
          color: var(--text-color);
        }
        .icon-box {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background: rgba(255,255,255,0.05);
            border-radius: 50%;
            color: var(--primary-color);
        }
        .detail-item a:hover {
          color: var(--primary-color);
          text-decoration: underline;
        }

        /* Social Links */
        .social-links {
            display: flex;
            gap: 15px;
            margin-top: 10px;
        }
        .social-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 45px;
            height: 45px;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            color: var(--text-muted);
            transition: all 0.3s ease;
        }
        .social-btn:hover {
            transform: translateY(-3px);
            color: white;
            border-color: var(--primary-color);
            background: var(--primary-color);
        }
        .social-hint {
            font-size: 0.9rem;
            color: var(--text-muted);
            margin-top: -15px;
        }

        .contact-card {
          padding: 40px;
          background: #0f1014; 
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--text-color);
        }
        
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 14px;
          background: #050505; 
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: var(--text-color);
          font-family: inherit;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--primary-color);
          background: rgba(59, 130, 246, 0.05);
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.3s ease;
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .submit-btn:hover {
          opacity: 0.9;
        }

        .form-footer-text {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 20px;
          text-align: center;
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .contact-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .contact-headline {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
