import React, { useEffect } from 'react';
import Head from '@docusaurus/Head';
import './homepage.css';

export default function ComingSoon() {
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('.footer');
    if (navbar) navbar.style.display = 'none';
    if (footer) footer.style.display = 'none';

    document.documentElement.style.backgroundColor = '#050d1a';
    document.body.style.backgroundColor = '#050d1a';
    document.body.style.color = '#e2e8f0';
    document.body.style.fontFamily = "'Inter', sans-serif";

    const style = document.createElement('style');
    style.id = 'coming-soon-style';
    style.textContent = `
      #coming-soon-root a {
        text-decoration: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.style.fontFamily = '';
      const injectedStyle = document.getElementById('coming-soon-style');
      if (injectedStyle) injectedStyle.remove();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Coming Soon | TimposuLabs</title>
        <meta name="description" content="Halaman ini sedang dalam pengembangan." />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div id="coming-soon-root" style={{ backgroundColor: '#050d1a', minHeight: '100vh' }}>

        {/* Background blur decoration kiri */}
        <div style={{
          position: 'fixed',
          top: '-10%',
          left: '-5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(29,78,216,0.45) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {/* Background blur decoration kanan */}
        <div style={{
          position: 'fixed',
          top: '-10%',
          right: '-5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(29,78,216,0.35) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {/* Konten utama */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 24px',
        }}>

          {/* Logo / Brand */}
          <a href="/" style={{ color: 'inherit', marginBottom: '48px', display: 'inline-block' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ffffff' }}>
              TimposuLabs
            </div>
          </a>

          {/* Badge */}
          <div style={{
            display: 'inline-block',
            padding: '6px 16px',
            marginBottom: '24px',
            fontSize: '0.75rem',
            fontWeight: '600',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#60a5fa',
            backgroundColor: 'rgba(96,165,250,0.1)',
            borderRadius: '9999px',
            border: '1px solid rgba(96,165,250,0.2)',
          }}>
            🚧 Dalam Pengembangan
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: '800',
            color: '#ffffff',
            marginBottom: '24px',
            lineHeight: '1.1',
          }}>
            Coming{' '}
            <span style={{
              background: 'linear-gradient(to right, #3b82f6, #6366f1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Soon
            </span>
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: '1.125rem',
            color: '#94a3b8',
            maxWidth: '480px',
            marginBottom: '48px',
            lineHeight: '1.7',
          }}>
            Halaman ini sedang kami kerjakan.
            Pantau terus untuk update terbaru dari TimposuLabs!
          </p>

          {/* Progress bar */}
          <div style={{
            width: '100%',
            maxWidth: '320px',
            marginBottom: '48px',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Progress</span>
              <span style={{ fontSize: '0.8rem', color: '#60a5fa', fontWeight: '600' }}>65%</span>
            </div>
            <div style={{
              width: '100%',
              height: '6px',
              backgroundColor: '#1e293b',
              borderRadius: '9999px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: '65%',
                height: '100%',
                background: 'linear-gradient(to right, #3b82f6, #6366f1)',
                borderRadius: '9999px',
              }} />
            </div>
          </div>

          {/* Divider */}
          <div style={{
            width: '100%',
            maxWidth: '320px',
            height: '1px',
            backgroundColor: 'rgba(255,255,255,0.08)',
            marginBottom: '48px',
          }} />

          {/* Info cards */}
          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '48px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <div style={{
              backgroundColor: '#1e293b',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '16px 24px',
              minWidth: '140px',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>📚</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Tutorial Baru</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>Segera Hadir</div>
            </div>
            <div style={{
              backgroundColor: '#1e293b',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '16px 24px',
              minWidth: '140px',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>⚡</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Fitur Baru</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>Dalam Proses</div>
            </div>
            <div style={{
              backgroundColor: '#1e293b',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '16px 24px',
              minWidth: '140px',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>🔧</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Tools Update</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>Coming Soon</div>
            </div>
          </div>

          {/* Tombol kembali */}
          <a
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              padding: '12px 28px',
              borderRadius: '10px',
              fontSize: '0.95rem',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#3b82f6'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            ← Kembali ke Beranda
          </a>

        </div>
      </div>
    </>
  );
}