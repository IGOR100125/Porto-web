import React from 'react';

const AboutDetail = ({ handleNavigation }) => {
  return (
    <section className="section-padding" style={{ paddingTop: '12rem', minHeight: '100vh' }}>
      <div className="animate-on-scroll fade-up" style={{ marginBottom: '4rem' }}>
        <button 
          onClick={() => handleNavigation('beranda', 'scroll')} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-heading)', color: 'var(--text-gray)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '2rem' }}
        >
          &larr; Kembali ke Beranda
        </button>
        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', lineHeight: '1.1' }}>INFORMASI <br/> TENTANG SAYA.</h1>
        <div style={{ width: '80px', height: '2px', backgroundColor: 'var(--accent-gold)', marginTop: '2rem' }}></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '5rem', alignItems: 'start' }}>
        <div className="animate-on-scroll fade-up">
          <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Mahasiswa Teknik Informatika & Data Scientist</h3>
          <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Halo! Saya Ramadhan Oktarizaldi, mahasiswa semester 5 Teknik Informatika. Perjalanan akademik saya berfokus pada pengolahan data kompleks, pengembangan model Machine Learning, dan pemanfaatan algoritma prediktif untuk memecahkan masalah nyata berbasis data.
          </p>

          
          {/* DIBUNGKUS DENGAN Kelas Animasi AGAR EFEKNYA SAMA */}
          <div className="animate-on-scroll fade-up">
            <a 
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('all-projects', 'page');
              }} 
              className="premium-btn"
            >
              Lihat Arsip Mahakarya
            </a>
          </div>
        </div>

        <div className="animate-on-scroll fade-up" style={{ backgroundColor: '#fff', padding: '3rem', border: '1px solid var(--border-light)' }}>
          <h4 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', letterSpacing: '1px' }}>Fokus & Keahlian</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-gray)' }}>
            <li style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0.8rem' }}>✦ Machine Learning</li>
            <li style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0.8rem' }}>✦ Data Integration</li>
            <li style={{ paddingBottom: '0.8rem' }}>✦ Eksplorasi Data & Python Analytics</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutDetail;