import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const [password, setPassword] = useState('');
    const { login } = useData();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(password)) {
            toast.success('Bienvenue Admin !');
            navigate('/admin');
        } else {
            toast.error('Mot de passe incorrect');
        }
    };

    return (
        <section style={{
            height: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '80px' // Compensate fixed header
        }}>
            <div className="glass" style={{ padding: '40px', width: '100%', maxWidth: '400px', borderRadius: '16px' }}>
                <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Admin Login</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '8px',
                                color: 'white',
                                outline: 'none'
                            }}
                            placeholder="Entrez le mot de passe"
                        />
                    </div>
                    <button type="submit" className="cta-button" style={{ width: '100%', justifyContent: 'center', color: 'var(--text-primary)', background: 'var(--glass-border)', border: 'none', borderRadius: '8px', padding: '12px', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', outline: 'none', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Se connecter
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Login;
