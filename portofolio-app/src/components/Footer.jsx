import React from 'react';

const Footer = () => {
  return (
    <footer id="kontak" className="section-padding" style={{ backgroundColor: 'var(--text-dark)', color: 'var(--bg-color)', textAlign: 'center' }}>
      
      {/* Animasi teks utama footer */}
      <div className="animate-on-scroll fade-up">
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '3rem', color: 'var(--accent-gold)' }}>
          MARI MEMBANGUN BERSAMA.
        </h2>
        <p style={{ color: '#aaa', maxWidth: '600px', margin: '0 auto 4rem auto', fontSize: '1.1rem' }}>
          Terbuka untuk kolaborasi proyek.
        </p>
      </div>
      
      {/* Tombol Footer dengan Pembungkus Animasi & Efek Hover */}
      <div className="animate-on-scroll fade-up" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Tombol Kirim Pesan */}
        <a 
          href="mailto:roktarizaldi@gmail.com" 
          className="premium-btn" 
          style={{ borderColor: 'var(--accent-gold)', color: 'var(--accent-gold)' }}
        >
          Kirim Pesan
        </a>

        {/* Tombol LinkedIn */}
        <a 
          href="https://linkedin.com/in/ramadhan-oktarizaldi-5429a732b" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="premium-btn" 
          style={{ borderColor: 'var(--bg-color)', color: 'var(--bg-color)' }}
        >
          LinkedIn
        </a>

      </div>

      {/* Copyright Footer */}
      <div className="animate-on-scroll fade-up" style={{ marginTop: '8rem', paddingTop: '2rem', borderTop: '1px solid #333', fontSize: '0.8rem', color: '#666', letterSpacing: '2px', textTransform: 'uppercase' }}>
        &copy; {new Date().getFullYear()} Ramadhan Oktarizaldi. Data Scientist.
      </div>

    </footer>
  );
};

export default Footer;