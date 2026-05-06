import React, { useEffect, useState } from 'react';
import Head from '@docusaurus/Head';
import './homepage.css';
import { FaYoutube, FaGithub, FaInstagram, FaTiktok, FaTelegramPlane } from 'react-icons/fa';

function NavbarSection() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(9, 15, 30, 0.95)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>

          {/* Brand */}
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <img src="/img/timposulabs.png" alt="TimposuLabs Logo" style={{ width: '32px', height: '32px' }} />
            <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff' }}>TimposuLabs</span>
          </a>

          {/* DESKTOP: Menu tengah */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>

              {/* Dropdown Tutorial */}
              <div style={{ position: 'relative' }}
                onMouseEnter={() => setOpenDropdown('tutorial')}
                onMouseLeave={() => setOpenDropdown(null)}>
                <button style={{
                  background: 'none', border: 'none', color: '#e2e8f0',
                  fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '4px',
                  padding: '8px 12px', borderRadius: '6px', transition: 'all 0.15s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#334155'; e.currentTarget.style.color = '#60a5fa'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#e2e8f0'; }}>
                  Tutorial
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                <div style={{
                  position: 'absolute', top: '100%', left: '0', paddingTop: '8px',
                  display: openDropdown === 'tutorial' ? 'block' : 'none',
                  minWidth: '200px', zIndex: 100,
                }}>
                  <div style={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '8px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                    <a href="/tutorial" style={{ display: 'block', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '500', color: '#e2e8f0', textDecoration: 'none' }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#334155'; e.currentTarget.style.color = '#60a5fa'; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#e2e8f0'; }}>
                      📚 Semua Tutorial
                    </a>
                    <a href="/docs/intro" style={{ display: 'block', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '500', color: '#e2e8f0', textDecoration: 'none' }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#334155'; e.currentTarget.style.color = '#60a5fa'; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#e2e8f0'; }}>
                      📖 Dokumentasi
                    </a>
                  </div>
                </div>
              </div>

              <a href="/blog" style={{ color: '#e2e8f0', fontWeight: '700', fontSize: '0.95rem', padding: '8px 12px', borderRadius: '6px', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#334155'; e.currentTarget.style.color = '#60a5fa'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#e2e8f0'; }}>
                Blog
              </a>

              <a href="/docs/intro" style={{ color: '#e2e8f0', fontWeight: '700', fontSize: '0.95rem', padding: '8px 12px', borderRadius: '6px', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#334155'; e.currentTarget.style.color = '#60a5fa'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#e2e8f0'; }}>
                Docs
              </a>
            </div>
          )}

          {/* DESKTOP: CTA buttons kanan */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <a href="/ebook" style={{ backgroundColor: '#16a34a', color: '#ffffff', padding: '8px 16px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#15803d'; e.currentTarget.style.color = '#ffffff'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#16a34a'; e.currentTarget.style.color = '#ffffff'; }}>
                📗 Ebook
              </a>
              <a href="/coming-soon" style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '8px 16px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: '600', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#3b82f6'; e.currentTarget.style.color = '#ffffff'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#2563eb'; e.currentTarget.style.color = '#ffffff'; }}>
                Gabung Kelas
              </a>
            </div>
          )}

          {/* MOBILE: Hamburger saja */}
          {isMobile && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: 'none', border: 'none', color: '#e2e8f0', cursor: 'pointer', padding: '8px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {mobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18"/>
                </svg>
              )}
            </button>
          )}

        </div>

        {/* MOBILE: Full dropdown menu */}
        {isMobile && mobileMenuOpen && (
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '12px',
            paddingBottom: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}>
            {/* Tutorial accordion */}
            <div>
              <button
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                style={{
                  width: '100%', background: 'none', border: 'none',
                  color: '#e2e8f0', fontWeight: '700', fontSize: '0.95rem',
                  cursor: 'pointer', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', padding: '10px 12px',
                  borderRadius: '8px',
                }}>
                Tutorial
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  style={{ transform: mobileDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              {mobileDropdownOpen && (
                <div style={{ paddingLeft: '16px', paddingTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <a href="/tutorial" style={{ display: 'block', padding: '10px 12px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '500', color: '#94a3b8', textDecoration: 'none' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#60a5fa'; e.currentTarget.style.backgroundColor = '#334155'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
                    📚 Semua Tutorial
                  </a>
                  <a href="/docs/intro" style={{ display: 'block', padding: '10px 12px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '500', color: '#94a3b8', textDecoration: 'none' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#60a5fa'; e.currentTarget.style.backgroundColor = '#334155'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
                    📖 Dokumentasi
                  </a>
                </div>
              )}
            </div>

            <a href="/blog" style={{ display: 'block', padding: '10px 12px', borderRadius: '8px', fontSize: '0.95rem', fontWeight: '700', color: '#e2e8f0', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#334155'; e.currentTarget.style.color = '#60a5fa'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#e2e8f0'; }}>
              Blog
            </a>

            <a href="/docs/intro" style={{ display: 'block', padding: '10px 12px', borderRadius: '8px', fontSize: '0.95rem', fontWeight: '700', color: '#e2e8f0', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#334155'; e.currentTarget.style.color = '#60a5fa'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#e2e8f0'; }}>
              Docs
            </a>

            {/* CTA full width */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <a href="/ebook" style={{ display: 'block', textAlign: 'center', backgroundColor: '#16a34a', color: '#ffffff', padding: '10px 16px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: '600', textDecoration: 'none' }}>
                📗 Download Ebook
              </a>
              <a href="/coming-soon" style={{ display: 'block', textAlign: 'center', backgroundColor: '#2563eb', color: '#ffffff', padding: '10px 16px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: '600', textDecoration: 'none' }}>
                Gabung Kelas
              </a>
            </div>
          </div>
        )}

      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section style={{ backgroundColor: '#050d1a' }} className="relative overflow-hidden pt-16 pb-24 lg:pt-32">
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(29,78,216,0.45) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(29,78,216,0.35) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0 }} />
      <div className="max-w-7xl mx-auto px-6 text-center relative" style={{ zIndex: 1 }}>
        <div style={{ display: 'inline-block', padding: '6px 16px', marginBottom: '24px', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#60a5fa', backgroundColor: 'rgba(96,165,250,0.1)', borderRadius: '9999px' }}>
          Belajar Aja Dulu · Nanti Juga Kaya
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight">
          Upgrade Skill Kamu Disini <br/>
          <span style={{ color: '#3b82f6' }}>Lengkap & Terstruktur</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.125rem', maxWidth: '768px', margin: '0 auto 48px' }}>
          Tutorial belajar Programming, Networking, DevOps, Cybersecurity dan teknologi lainnya.
          Belajar dari dasar hingga mahir dengan materi terstruktur.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
          <a href="/docs/intro"
            style={{ color: '#0f172a', textDecoration: 'none', backgroundColor: '#ffffff', padding: '16px 32px', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', transition: 'background-color 0.15s ease', display: 'inline-block' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#e2e8f0'; e.currentTarget.style.color = '#0f172a'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.color = '#0f172a'; }}>
            👩‍💻 Mulai Belajar Sekarang
          </a>
          <a href="/blog"
            style={{ color: '#e2e8f0', textDecoration: 'none', backgroundColor: '#1e293b', border: '1px solid #334155', padding: '16px 32px', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', transition: 'background-color 0.15s ease', display: 'inline-block' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#334155'; e.currentTarget.style.color = '#e2e8f0'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#1e293b'; e.currentTarget.style.color = '#e2e8f0'; }}>
            📖 Baca Blog
          </a>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section id="stats" style={{ backgroundColor: '#111827', borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b', padding: '48px 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '100+', label: 'Tutorial Tersedia' },
            { value: '20+', label: 'Teknologi Dibahas' },
            { value: '10rb+', label: 'Member Komunitas' },
            { value: 'Rutin', label: 'Update Konten' },
          ].map(item => (
            <div key={item.label}>
              <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>{item.value}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const cards = [
    {
      iconColor: '#3b82f6', iconBg: 'rgba(59,130,246,0.1)', borderHover: 'rgba(59,130,246,0.5)',
      title: 'Dokumentasi Lengkap',
      desc: 'Setiap teknologi dijelaskan dengan contoh kode siap pakai. Dari konsep dasar hingga implementasi lanjutan.',
      tags: ['Spring Boot', 'Jakarta EE'],
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
    },
    {
      iconColor: '#10b981', iconBg: 'rgba(16,185,129,0.1)', borderHover: 'rgba(16,185,129,0.5)',
      title: 'Praktis & Real Project',
      desc: 'Fokus pada praktik langsung dengan proyek nyata. Hemat waktu dengan tutorial yang langsung bisa diaplikasikan.',
      tags: ['Docker', 'CI/CD'],
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />,
    },
    {
      iconColor: '#a855f7', iconBg: 'rgba(168,85,247,0.1)', borderHover: 'rgba(168,85,247,0.5)',
      title: 'Tools Developer Modern',
      desc: 'Pelajari tools yang digunakan di industri: Docker, CI/CD, testing, debugging, dan best practices.',
      tags: ['HTMX', 'Alpine.js'],
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />,
    },
  ];

  return (
    <section id="features" style={{ backgroundColor: '#0f172a', padding: '96px 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px', gap: '24px' }}>
          <div style={{ maxWidth: '480px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#ffffff', marginBottom: '16px' }}>Layanan & Keahlian Kami</h2>
            <p style={{ color: '#94a3b8' }}>Fokus pada performa dan pengalaman pengguna dengan teknologi terkini untuk hasil maksimal.</p>
          </div>
          <a href="/docs/intro" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: '600' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#93c5fd'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#60a5fa'; }}>
            Lihat semua layanan →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div key={i}
              style={{ padding: '32px', borderRadius: '24px', backgroundColor: 'rgba(30,41,59,0.4)', border: '1px solid #334155', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1e293b'; e.currentTarget.style.borderColor = card.borderHover; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(30,41,59,0.4)'; e.currentTarget.style.borderColor = '#334155'; }}>
              <div style={{ width: '56px', height: '56px', backgroundColor: card.iconBg, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
                <svg style={{ width: '28px', height: '28px' }} fill="none" stroke={card.iconColor} viewBox="0 0 24 24">{card.icon}</svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff', marginBottom: '16px' }}>{card.title}</h3>
              <p style={{ color: '#94a3b8', marginBottom: '24px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{card.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {card.tags.map(tag => (
                  <span key={tag} style={{ padding: '4px 8px', backgroundColor: '#334155', borderRadius: '4px', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#cbd5e1' }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section style={{ backgroundColor: '#0f172a', padding: '80px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(to right, #2563eb, #4338ca)', borderRadius: '48px', padding: '64px 48px', textAlign: 'center', boxShadow: '0 25px 50px rgba(0,0,0,0.4)', overflow: 'hidden', position: 'relative' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '700', color: '#ffffff', marginBottom: '24px', position: 'relative', zIndex: 10 }}>
            Siap Memulai Perjalanan Belajarmu?
          </h2>
          <p style={{ color: '#bfdbfe', marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px', position: 'relative', zIndex: 10 }}>
            Bergabung dengan ribuan developer yang sudah meningkatkan skill mereka. Mulai dari sekarang, gratis!
          </p>
          <a href="/docs/intro"
            style={{ display: 'inline-block', backgroundColor: '#ffffff', color: '#312e81', padding: '16px 40px', borderRadius: '16px', fontWeight: '700', textDecoration: 'none', position: 'relative', zIndex: 10, transition: 'background-color 0.15s ease' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#e2e8f0'; e.currentTarget.style.color = '#312e81'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.color = '#312e81'; }}>
            Mulai Belajar Gratis
          </a>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '256px', height: '256px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%', marginRight: '-80px', marginTop: '-80px', filter: 'blur(40px)' }} />
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  const pages = [
    { label: 'About', href: '/about' },
    { label: 'Blog Archive', href: '/blog/archive' },
    { label: 'Contact', href: '/contact' },
    { label: 'Term & Condition', href: '/terms-conditions' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
  ];
  const socials = [
    { href: 'https://www.youtube.com/@TimposuLabs', icon: <FaYoutube size={20} />, hoverColor: '#FF0000' },
    { href: 'https://github.com/TimposuLabs', icon: <FaGithub size={20} />, hoverColor: '#24292e' },
    { href: 'https://www.instagram.com/timposulabs', icon: <FaInstagram size={20} />, hoverColor: '#E1306C' },
    { href: 'https://www.tiktok.com/@timposulabs', icon: <FaTiktok size={18} />, hoverColor: '#000000' },
    { href: 'https://t.me/Timposu_Labs', icon: <FaTelegramPlane size={20} />, hoverColor: '#0088cc' },
  ];
  const links = [
    { label: 'Diskusi', href: 'https://github.com/TimposuLabs/forum/discussions/categories/tanya-jawab' },
    { label: 'GitHub', href: 'https://github.com/TimposuLabs' },
  ];

  return (
    <footer style={{ borderTop: '1px solid #1e293b', paddingTop: '64px', paddingBottom: '32px', backgroundColor: '#020617' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12" style={{ marginBottom: '64px' }}>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff', marginBottom: '24px' }}>TimposuLabs</div>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: '1.6' }}>
              Platform tutorial programming, devops, networking, cyber security dan teknologi lainnya untuk anak Indonesia.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#ffffff', fontWeight: '700', marginBottom: '24px' }}>Pages</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {pages.map(item => (
                <li key={item.href}>
                  <a href={item.href} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; }}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#ffffff', fontWeight: '700', marginBottom: '24px' }}>Social Media</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {socials.map((item, i) => (
                <a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
                  style={{ width: '40px', height: '40px', backgroundColor: '#1e293b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', textDecoration: 'none', transition: 'background-color 0.15s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = item.hoverColor; e.currentTarget.style.color = '#ffffff'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#1e293b'; e.currentTarget.style.color = '#ffffff'; }}>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ color: '#ffffff', fontWeight: '700', marginBottom: '24px' }}>Link</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {links.map(item => (
                <li key={item.href}>
                  <a href={item.href} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; }}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #0f172a', paddingTop: '32px', textAlign: 'center', color: '#64748b', fontSize: '0.75rem' }}>
          © 2026 TimposuLabs. Build with Love 🚀
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('.footer');
    if (navbar) navbar.style.display = 'none';
    if (footer) footer.style.display = 'none';

    document.documentElement.style.backgroundColor = '#050d1a';
    document.body.style.backgroundColor = '#050d1a';
    document.body.style.fontFamily = "'Inter', sans-serif";

    const style = document.createElement('style');
    style.id = 'homepage-link-style';
    style.textContent = `
      #homepage-root {
        --ifm-link-color: #e2e8f0;
        --ifm-link-hover-color: #e2e8f0;
        --ifm-color-primary: #2563eb;
      }
      #homepage-root a {
        text-decoration: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
      document.body.style.fontFamily = '';
      const injectedStyle = document.getElementById('homepage-link-style');
      if (injectedStyle) injectedStyle.remove();
    };
  }, []);

  return (
    <>
      <Head>
        <title>TimposuLabs | Belajar Programming</title>
        <meta name="description" content="Dokumentasi dan tutorial programming untuk developer Indonesia." />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div id="homepage-root" style={{ backgroundColor: '#050d1a' }}>
        <NavbarSection />
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <CTASection />
        <FooterSection />
      </div>
    </>
  );
}