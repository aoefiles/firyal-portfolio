'use client';

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.classList.remove('no-scroll');
    }, 2500);

    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light-mode');
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
  
      <div id="splash-screen" className={isLoading ? '' : 'hidden'}>
        <div className="splash-text">Firyal Portfolio.</div>
        <div className="loader-bar"></div>
      </div>

      <main className={isLoading ? "h-screen overflow-hidden" : ""}>
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
        
      </main>
    </>
  );
}