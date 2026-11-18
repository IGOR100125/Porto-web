import React from 'react';

const IntroSection = ({ handleNavigation }) => {
  return (
    <section id="filosofi" className="section-padding">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '5rem', alignItems: 'center' }}>
        
        <div className="animate-on-scroll fade-up zoom-wrapper" style={{ height: '700px', width: '100%' }}>
           <div className="zoom-img" style={{
             backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiWkJ4wN_6BIwMedHhMkkyxvceKh0eJvyx8W0GCgmFGh20JLOAXK5pcRo&s=10)',
             backgroundSize: 'cover', backgroundPosition: 'center'
           }}></div>
        </div>

        <div>
          <div className="animate-on-scroll">
             <div className="reveal-wrapper">
               <h2 className="reveal-text" style={{ fontSize: '3.5rem', lineHeight: '1.2', marginBottom: '2rem' }}>SENI MENGUBAH ANGKA MENJADI BERMAKNA</h2>
             </div>
          </div>
          
          <p className="animate-on-scroll fade-up" style={{ color: 'var(--text-gray)', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '90%' }}>
            "Sesuatu yang mentah hanyalah benda mati. Ia baru dilahirkan kembali ketika pikiran meniupkan interpretasi, mengubah materi biasa menjadi sebuah perwujudan makna."
          </p>
          <p className="animate-on-scroll fade-up" style={{ color: 'var(--text-gray)', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '90%' }}>
            — Adaptasi dari Pemikiran Arthur Danto
          </p>
          
          <div className="animate-on-scroll fade-up">
            <a 
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('about-me', 'page');
              }} 
              className="premium-btn"
            >
              Informasi Lanjut
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default IntroSection;