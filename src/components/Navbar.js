'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('theme') === 'light') {
      setIsLightMode(true);
      document.body.classList.add('light-mode');
    }
  }, []);

  // Ganti Tema
  const toggleTheme = () => {
    setIsLightMode((prevTheme) => {
      const newTheme = !prevTheme;
      
      if (newTheme) {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
      } else {
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
      }
      
      return newTheme;
    });
  };

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 bg-[var(--bg-nav)] backdrop-blur-[10px] px-[30px] py-[10px] rounded-[50px] border border-border-color z-[1000] flex items-center gap-[20px] transition-all duration-300">
      <NavLink href="#home" text="Home" />
      <NavLink href="#about" text="About" />
      <NavLink href="#projects" text="Project" />
      <NavLink href="#contact" text="Contact" />
      
      {/* Tombol Theme Toggle */}
      <button 
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        className="text-text-muted hover:text-text-main text-[0.95rem] transition-all duration-300 hover:scale-110 pl-[10px] border-l border-border-color flex items-center justify-center bg-transparent cursor-pointer"
      >
        <i className={`fa-solid ${isLightMode ? 'fa-sun' : 'fa-moon'}`}></i>
      </button>
    </nav>
  );
}

// Link navigasi
function NavLink({ href, text }) {
  return (
    <Link 
      href={href} 
      className="text-[0.85rem] text-text-muted hover:text-text-main transition-colors font-normal relative group"
    >
      {text}
      {/* Animasi Hover */}
      <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}