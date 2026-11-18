import React, { useState, useEffect } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import Expertise from './components/ExpertiseSection';
import ProjectsSection from './components/ProjectsSection';
import AllProjects from './components/AllProjects';
import AboutDetail from './components/AboutDetail';
import TaskWorkspace from './components/TaskWorkspace';
import Footer from './components/Footer';
import './index.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simpan halaman aktif di localStorage agar tidak kembali ke Beranda saat browser ter-refresh
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('activeView') || 'home';
  });
  
  useScrollReveal(currentView);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const handleNavigation = (target, type = 'page') => {
    setIsLoading(true); // Tirai loading "RO." turun
    
    setTimeout(() => {
      if (type === 'page') {
        setCurrentView(target);
        localStorage.setItem('activeView', target); // Simpan status halaman aktif
        window.scrollTo(0, 0);
      } else if (type === 'scroll') {
        if (currentView !== 'home') {
          setCurrentView('home');
          localStorage.setItem('activeView', 'home');
        }
        setTimeout(() => {
          const element = document.getElementById(target);
          if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
          }
        }, 100);
      }
      setIsLoading(false); // Tirai naik kembali
    }, 800);
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <Navbar handleNavigation={handleNavigation} />
      
      <main>
        {currentView === 'home' && (
          <>
            <HeroSection handleNavigation={handleNavigation} />
            <IntroSection handleNavigation={handleNavigation} />
            <Expertise handleNavigation={handleNavigation} />
            <ProjectsSection handleNavigation={handleNavigation} />
            <TaskWorkspace handleNavigation={handleNavigation} />
          </>
        )}

        {currentView === 'about-me' && (
          <AboutDetail handleNavigation={handleNavigation} />
        )}

        {currentView === 'all-projects' && (
          <AllProjects handleNavigation={handleNavigation} />
        )}

        {/* Mendaftarkan TaskWorkspace sebagai halaman terpisah */}
        {currentView === 'task-workspace' && (
          <TaskWorkspace handleNavigation={handleNavigation} />
        )}
      </main>
      
      <Footer />
    </>
  );
};

export default App;