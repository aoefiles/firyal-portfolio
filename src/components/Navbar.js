// src/components/Navbar.js
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname(); 
  const [isLightMode, setIsLightMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
      document.body.classList.add('light-mode');
      setIsLightMode(true);
    }

    const handleScroll = () => {
      // Efek mengecil/mendalam aktif setelah scroll 40px
      if (window.scrollY > 40) setIsScrolled(true);
      else setIsScrolled(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isLightMode) {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
      setIsLightMode(false);
    } else {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
      setIsLightMode(true);
    }
  };

  return (
    <nav className={`fade-in visible animate-on-scroll ${isScrolled ? 'scrolled' : ''}`}>
      
      <Link href="/" className={pathname === '/' ? 'active' : ''}>
        <i className="ph ph-house"></i>
        <span className="nav-text">Home</span>
      </Link>
      
      <Link href="/about" className={pathname === '/about' ? 'active' : ''}>
        <i className="ph ph-user"></i>
        <span className="nav-text">About</span>
      </Link>
      
      <Link href="/project" className={pathname === '/project' ? 'active' : ''}>
        <i className="ph ph-briefcase"></i>
        <span className="nav-text">Project</span>
      </Link>
      
      <Link href="/contact" className={pathname === '/contact' ? 'active' : ''}>
        <i className="ph ph-envelope-simple"></i>
        <span className="nav-text">Contact</span>
      </Link>
      
      <div className="nav-divider"></div>
      
      <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
        <i className={`ph ${isLightMode ? 'ph-moon' : 'ph-sun'}`}></i>
      </button>
      
    </nav>
  );
}