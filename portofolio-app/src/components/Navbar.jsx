import React, { useState, useEffect } from 'react';

const Navbar = ({ handleNavigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  const navLinks = [
    { name: 'Beranda', target: 'beranda' },
    { name: 'Filosofi', target: 'filosofi' },
    { name: 'Portofolio', target: 'portofolio' },
    { name: 'Kontak', target: 'kontak' }
  ];

  const onMenuClick = (e, target) => {
    e.preventDefault();
    setIsOpen(false); // Tutup menu layar penuh
    handleNavigation(target, 'scroll'); // Panggil loading
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, width: '100%', padding: scrolled ? '1.5rem 8%' : '2.5rem 8%',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: scrolled && !isOpen ? 'rgba(248, 248, 246, 0.95)' : 'transparent',
        borderBottom: scrolled && !isOpen ? '1px solid var(--border-light)' : 'none',
        zIndex: 1000, transition: 'all 0.5s ease'
      }}>
        <h2 
          onClick={() => handleNavigation('beranda', 'scroll')}
          style={{ fontSize: '1.2rem', letterSpacing: '4px', zIndex: 1001, color: 'var(--text-dark)', cursor: 'pointer' }}
        >
          R. OKTARIZALDI
        </h2>

        <button className={`hamburger ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <span></span><span></span>
        </button>
      </nav>

      <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', gap: '1rem' }}>
          {navLinks.map((link, i) => (
            <a key={i} href={`#${link.target}`} className="menu-link" onClick={(e) => onMenuClick(e, link.target)}>
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;