// src/components/Navbar.js

"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Untuk mendeteksi halaman aktif
import { useEffect, useState, useRef } from 'react'; // Tambahkan useRef

export default function Navbar() {
  const pathname = usePathname(); 
  const [isLightMode, setIsLightMode] = useState(false);
  const navRef = useRef(null); // Gunakan useRef untuk elemen navbar

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
      document.body.classList.add('light-mode');
      setIsLightMode(true);
    }

    // Intersection Observer untuk animasi 'on-scroll'
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); // Tambahkan kelas 'visible' saat masuk ke viewport
        }
      });
    });

    if (navRef.current) {
      observer.observe(navRef.current); // Pantau elemen navbar
    }

    return () => {
      if (navRef.current) {
        observer.unobserve(navRef.current); // Berhenti pantau saat komponen di-unmount
      }
    };
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
    <nav ref={navRef} className="fade-in visible animate-on-scroll"> {/* Tambahkan ref dan kelas animate-on-scroll */}
      <Link href="/" className={pathname === '/' ? 'active' : ''}>Home</Link>
      <Link href="/about" className={pathname === '/about' ? 'active' : ''}>About</Link>
      <Link href="/project" className={pathname === '/project' ? 'active' : ''}>Project</Link>
      <Link href="/contact" className={pathname === '/contact' ? 'active' : ''}>Contact</Link>
      
      <i 
        id="theme-btn" 
        className={`ph theme-toggle ${isLightMode ? 'ph-moon' : 'ph-sun'}`}
        onClick={toggleTheme}
      ></i>
    </nav>
  );
}