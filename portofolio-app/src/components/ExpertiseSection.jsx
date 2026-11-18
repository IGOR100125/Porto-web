import React from 'react';

const ExpertiseSection = () => {
  const skills = [
    { title: "Data Analysis", desc: "Mengeksplorasi dan memvalidasi tren guna memecahkan masalah berbasis data." },
    { title: "Data Integration", desc: "Menyelaraskan struktur data yang beragam ke dalam satu arsitektur terpadu." },
    { title: "Machine Learning", desc: "Merancang dan mengoptimalkan algoritma prediktif menggunakan Python untuk membangun solusi cerdas." }
  ];

  return (
    <section id="expertise" className="section-padding" style={{ backgroundColor: '#fff' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem' }}>
        <div className="animate-on-scroll fade-up">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Pilar <br/> Keahlian.</h2>
          <div style={{ width: '50px', height: '2px', backgroundColor: 'var(--accent-gold)' }}></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {skills.map((skill, index) => (
            <div key={index} className="animate-on-scroll fade-up" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '2rem' }}>
              <p style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>0{index + 1}</p>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', letterSpacing: '1px' }}>{skill.title}</h3>
              <p style={{ color: 'var(--text-gray)' }}>{skill.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ExpertiseSection;