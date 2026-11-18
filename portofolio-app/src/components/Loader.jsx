import React from 'react';

const Loader = ({ isLoading }) => {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
      backgroundColor: '#1A1A1A', zIndex: 9999, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      transform: isLoading ? 'translateY(0)' : 'translateY(-100%)',
      transition: 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)'
    }}>
      <h1 style={{ color: '#F8F8F6', letterSpacing: '8px', fontSize: '2rem' }}>RO.</h1>
    </div>
  );
};

export default Loader;