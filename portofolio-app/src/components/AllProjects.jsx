import React, { useState, useEffect } from 'react';

const AllProjects = ({ handleNavigation }) => {
  // Tempat untuk menyimpan data proyek dari GitHub
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mengambil data repo dari username GitHub kamu
    fetch('https://api.github.com/users/IGOR100125/repos?sort=updated')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
        } else {
          setRepos([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Gagal memuat GitHub repos:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="section-padding" style={{ paddingTop: '12rem', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      
      {/* Header Halaman */}
      <div style={{ marginBottom: '6rem' }}>
        <button 
          onClick={() => handleNavigation('beranda', 'scroll')} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-heading)', color: 'var(--text-gray)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '2rem' }}
        >
          &larr; Kembali ke Beranda
        </button>
        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', lineHeight: '1.1' }}>ARSIP <br/> MAHKARYA.</h1>
        <div style={{ width: '80px', height: '2px', backgroundColor: 'var(--accent-gold)', marginTop: '2rem' }}></div>
      </div>

      {/* Status Loading */}
      {loading ? (
        <div style={{ fontSize: '1.2rem', color: 'var(--text-gray)', padding: '2rem 0' }}>
          Memuat repositori dari GitHub...
        </div>
      ) : (
        /* List Card Proyek dari GitHub */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {repos.length === 0 ? (
            <p style={{ color: 'var(--text-gray)' }}>Tidak ada repositori publik ditemukan.</p>
          ) : (
            repos.map((repo) => (
              <div 
                key={repo.id} 
                style={{ 
                  padding: '3rem', 
                  backgroundColor: '#fff', 
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}
              >
                <h3 style={{ fontSize: '2rem', textTransform: 'capitalize' }}>
                  {repo.name}
                </h3>
                
                <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                  {repo.description ? repo.description : "Tidak ada deskripsi."}
                </p>

                <div>
                  <a 
                    href={repo.html_url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="premium-btn"
                  >
                    Lihat di GitHub &rarr;
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default AllProjects;