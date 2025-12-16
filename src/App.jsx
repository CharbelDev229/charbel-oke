import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { DataProvider, useData } from './context/DataContext';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import ProjectsManager from './pages/admin/ProjectsManager';
import BlogManager from './pages/admin/BlogManager';
import AdminLayout from './pages/admin/AdminLayout';
import ProjectDetail from './pages/ProjectDetail';
import HeroManager from './pages/admin/HeroManager';
import AboutManager from './pages/admin/AboutManager';
import SkillsManager from './pages/admin/SkillsManager';
import ServicesManager from './pages/admin/ServicesManager';
import ContactManager from './pages/admin/ContactManager';

// Wrapper pour le site public (garde le Layout Header/Footer)
const PublicLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer style={{
        textAlign: 'center',
        padding: '20px',
        borderTop: '1px solid var(--glass-border)',
        color: '#64748b'
      }}>
        <p>&copy; 2024 Mon Portfolio. Tous droits réservés.</p>
      </footer>
    </>
  );
};

// Wrapper pour protéger les routes admin
const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useData();
  if (!isAdmin) return <Navigate to="/login" replace />;
  return children;
};

// Page d'accueil (Assemblage des sections comme avant)
const Home = () => (
  <>
    <Hero />
    <About />
    <Skills />
    <Services />
    <Portfolio />
    <Contact />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<ProjectsManager />} />
            <Route path="blog" element={<BlogManager />} />

            {/* New Section Managers */}
            <Route path="hero" element={<HeroManager />} />
            <Route path="about" element={<AboutManager />} />
            <Route path="skills" element={<SkillsManager />} />
            <Route path="services" element={<ServicesManager />} />
            <Route path="contact" element={<ContactManager />} />
          </Route>
        </Routes>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
