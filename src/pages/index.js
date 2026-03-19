import React, { useEffect } from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import './homepage.css';

function NavbarSection() {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(9, 15, 30, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#ffffff',
          }}>
            TimposuLabs
          </div>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <Link to="/tutorial" style={{ fontWeight: '700' }} className="hover:text-blue-400 transition">Tutorial</Link>
          <Link to="/blog" style={{ fontWeight: '700' }} className="hover:text-blue-400 transition">Blog</Link>
          <Link to="/docs/intro" style={{ fontWeight: '700' }} className="hover:text-blue-400 transition">Docs</Link>
        </div>
        <Link 
          to="/docs/intro"
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-semibold transition shadow-lg shadow-blue-600/20"
        >
          Mulai Belajar
        </Link>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      style={{ backgroundColor: '#050d1a' }}
      className="relative overflow-hidden pt-16 pb-24 lg:pt-32"
    >
      {/* Blur decoration kiri */}
      <div style={{
        position: 'absolute',
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

      {/* Blur decoration kanan */}
      <div style={{
        position: 'absolute',
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

      {/* Konten hero — tambahkan relative z-10 agar di atas blur */}
      <div className="max-w-7xl mx-auto px-6 text-center relative" style={{ zIndex: 1 }}>
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-blue-400 uppercase bg-blue-400/10 rounded-full">
          Open Source · Gratis Selamanya
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight">
          Belajar Programming <br/>
          <span className="text-blue-500">Lebih Cepat & Terstruktur.</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto mb-12">
          Dokumentasi dan tutorial lengkap untuk developer Indonesia.
          Dari dasar hingga mahir, semua tersedia gratis.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/docs/intro"
            className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition shadow-xl"
          >
            Mulai Belajar Sekarang
          </Link>
          <Link
            to="/blog"
            className="px-8 py-4 bg-slate-800 border border-slate-700 rounded-xl font-bold hover:bg-slate-700 transition"
          >
            Baca Blog
          </Link>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section id="stats" className="py-12 border-y border-slate-800 bg-slate-900/50" style={{ backgroundColor: '#111827' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-white mb-1">100+</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest">Tutorial Tersedia</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">20+</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest">Teknologi Dibahas</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">10rb+</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest">Member Komunitas</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">Rutin</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest">Update Konten</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-24 max-w-7xl mx-auto px-6" style={{ backgroundColor: '#0f172a' }}>
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-xl text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Layanan & Keahlian Kami</h2>
          <p className="text-slate-400">Fokus pada performa dan pengalaman pengguna dengan teknologi terkini untuk hasil maksimal.</p>
        </div>
        <Link 
          to="/docs/intro"
          className="text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center group"
        >
          Lihat semua layanan <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="group p-8 rounded-3xl bg-slate-800/40 border border-slate-700 hover:bg-slate-800 hover:border-blue-500/50 transition-all duration-300">
          <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8">
            <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Dokumentasi Lengkap</h3>
          <p 
            className="text-slate-400 mb-6"
            style={{ 
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            Setiap teknologi dijelaskan dengan contoh kode siap pakai. 
            Dari konsep dasar hingga implementasi lanjutan.
          </p>
          <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider">
            <span className="px-2 py-1 bg-slate-700 rounded text-slate-300">Spring Boot</span>
            <span className="px-2 py-1 bg-slate-700 rounded text-slate-300">Jakarta EE</span>
          </div>
        </div>

        <div className="group p-8 rounded-3xl bg-slate-800/40 border border-slate-700 hover:bg-slate-800 hover:border-emerald-500/50 transition-all duration-300">
          <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8">
            <svg className="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Praktis & Real Project</h3>
          <p 
            className="text-slate-400 mb-6"
            style={{ 
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            Fokus pada praktik langsung dengan proyek nyata. 
            Hemat waktu dengan tutorial yang langsung bisa diaplikasikan.
          </p>
          <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider">
            <span className="px-2 py-1 bg-slate-700 rounded text-slate-300">Docker</span>
            <span className="px-2 py-1 bg-slate-700 rounded text-slate-300">CI/CD</span>
          </div>
        </div>

        <div className="group p-8 rounded-3xl bg-slate-800/40 border border-slate-700 hover:bg-slate-800 hover:border-purple-500/50 transition-all duration-300">
          <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-8">
            <svg className="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Tools Developer Modern</h3>
          <p 
            className="text-slate-400 mb-6"
            style={{ 
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            Pelajari tools yang digunakan di industri: 
            Docker, CI/CD, testing, debugging, dan best practices.
          </p>
          <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider">
            <span className="px-2 py-1 bg-slate-700 rounded text-slate-300">HTMX</span>
            <span className="px-2 py-1 bg-slate-700 rounded text-slate-300">Alpine.js</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[3rem] p-12 text-center shadow-2xl overflow-hidden relative">
        <h2 className="text-4xl font-bold text-white mb-6 relative z-10">Siap Memulai Perjalanan Belajarmu?</h2>
        <p className="text-blue-100 mb-10 max-w-xl mx-auto relative z-10">
          Bergabung dengan ribuan developer yang sudah 
          meningkatkan skill mereka. Mulai dari sekarang, gratis!
        </p>
        <Link 
          to="/docs/intro"
          className="bg-white text-indigo-900 px-10 py-4 rounded-2xl font-bold hover:bg-slate-100 transition relative z-10"
        >
          Mulai Belajar Gratis
        </Link>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="border-t border-slate-800 pt-16 pb-8 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="text-xl font-bold text-white mb-6">TimposuLabs</div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Platform dokumentasi dan tutorial programming 
            untuk developer Indonesia.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Pages</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><Link to="/about" className="hover:text-white transition">About</Link></li>
            <li><Link to="/blog" className="hover:text-white transition">Blog</Link></li>
            <li><Link to="/tutorial" className="hover:text-white transition">Tutorial</Link></li>
            <li><Link to="/docs/intro" className="hover:text-white transition">Docs</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Social Media</h4>
          <div className="flex space-x-4">
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition text-white">YT</a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition text-white">GH</a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition text-white">IG</a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Link</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><a href="#" className="hover:text-white transition">Donasi</a></li>
            <li><a href="#" className="hover:text-white transition">Diskusi</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-900 text-center text-slate-500 text-xs">
        © 2026 TimposuLabs. Build with ❤️
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
    document.body.style.color = '#e2e8f0';
    document.body.style.fontFamily = "'Inter', sans-serif";

    // Override warna link khusus homepage
    const style = document.createElement('style');
    style.id = 'homepage-link-style';
    style.textContent = `
      #homepage-root a {
        color: inherit !important;
        text-decoration: none !important;
      }
      #homepage-root .navbar a {
        color: #e2e8f0 !important;
      }
      #homepage-root a:hover {
        color: inherit !important;
      }
      #homepage-root a.bg-white,
      #homepage-root a.bg-white:hover {
        color: #0f172a !important;
      }
      #homepage-root button.bg-white,
      #homepage-root button.bg-white:hover {
        color: #0f172a !important;
      }
      #homepage-root nav {
        background-color: rgba(9, 15, 30, 0.75) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
      }
    `;
    document.head.appendChild(style);

    // Cleanup: kembalikan semua ke semula saat pindah halaman
    return () => {
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
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
