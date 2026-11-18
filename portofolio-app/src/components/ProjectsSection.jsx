import React, { useState, useEffect } from 'react';

const ProjectsSection = ({ handleNavigation }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users/ramadhanoktarizaldi/repos?sort=updated&per_page=2')
      .then(res => res.json())
      .then(data => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]));
  }, []);

  return (
    <section id="portofolio" className="section-padding" style={{ backgroundColor: '#fff' }}>
      <div className="animate-on-scroll fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
        <h2 style={{ fontSize: '3rem' }}>Portofolio <br/> Terpilih.</h2>
        
        {/* DIBUNGKUS KELAS ANIMASI AGAR HOVER-NYA BERFUNGSI SEMPURNA */}
        <div className="animate-on-scroll fade-up">
          <a 
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('all-projects', 'page');
            }}
            className="premium-btn"
          >
            Eksplorasi Proyek
          </a>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
        {projects.map((project) => (
          <div key={project.id} className="animate-on-scroll fade-up" onClick={() => window.open(project.html_url, '_blank')} style={{ cursor: 'pointer' }}>
            <div style={{ width: '100%', height: '350px', backgroundColor: '#eae6df', overflow: 'hidden', marginBottom: '1.5rem' }}>
              <div style={{ width: '100%', height: '100%', backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', textTransform: 'capitalize' }}>
              {project.name.replace(/-/g, ' ')}
            </h3>
            <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>
              {project.description || 'Arsitektur sistem web modern.'}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;