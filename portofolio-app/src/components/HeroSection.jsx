import React, { useEffect } from 'react';

const HeroSection = ({ handleNavigation }) => {
  useEffect(() => {
    setTimeout(() => {
      document.getElementById('hero-content')?.classList.add('is-visible');
    }, 2100);
  }, []);

  return (
    <section id="beranda" style={{ height: '100vh', display: 'flex', alignItems: 'center', padding: '0 8%', position: 'relative' }}>
      <div id="hero-content" style={{ zIndex: 2, marginTop: '5rem', width: '100%' }}>
        <div className="animate-on-scroll">
          <div className="reveal-wrapper" style={{ marginBottom: '1.5rem' }}>
            <p className="reveal-text" style={{ color: 'var(--accent-gold)', letterSpacing: '5px', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600 }}>
              Data Scientist
            </p>
          </div>
        </div>
        
        <div className="animate-on-scroll">
          <div className="reveal-wrapper">
            <h1 className="reveal-text" style={{ fontSize: 'clamp(4rem, 10vw, 9rem)', lineHeight: '1', letterSpacing: '2px', marginLeft: '-5px' }}>
              RAMADHAN
            </h1>
          </div>
          <div className="reveal-wrapper" style={{ marginBottom: '3rem' }}>
            <h1 className="reveal-text" style={{ fontSize: 'clamp(4rem, 10vw, 9rem)', lineHeight: '1', letterSpacing: '2px', marginLeft: '-5px' }}>
              OKTARIZALDI.
            </h1>
          </div>
        </div>
        
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

      <div className="animate-on-scroll fade-up zoom-wrapper" style={{
        position: 'absolute', right: '8%', top: '25%', width: '35%', height: '60%', zIndex: 1
      }}>
      </div>
    </section>
  );
};

export default HeroSection;