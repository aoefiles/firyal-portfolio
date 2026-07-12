// src/app/page.js
import Navbar from '../components/Navbar';
import Home from '../components/Home';

export default function HomePage() {
  return (
    <>
      <Navbar />
      
      <main style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Home />
      </main>

      <footer className="fade-in visible">
        <p>&copy; 2026 Firyal Aufa F. All rights reserved.</p>
      </footer>
    </>
  );
}