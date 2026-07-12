// src/app/contact/page.js
import Navbar from '../../components/Navbar';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      
      <main className="main-content">
        <div className="bento-container">
          
          {/* Social Icons Grid */}
          <a href="https://github.com/aoefiles" target="_blank" rel="noreferrer" className="card social-card">
            <i className="ph ph-github-logo"></i>
          </a>
          <a href="https://linkedin.com/in/firyalaufa" target="_blank" rel="noreferrer" className="card social-card">
            <i className="ph ph-linkedin-logo"></i>
          </a>
          <a href="https://instagram.com/firyalaufaf" target="_blank" rel="noreferrer" className="card social-card">
            <i className="ph ph-instagram-logo"></i>
          </a>
          <a href="https://medium.com/@firyalaufa23" target="_blank" rel="noreferrer" className="card social-card">
            <i className="ph ph-medium-logo"></i>
          </a>

          {/* Form Card */}
          <div className="card card-form">
            <h2>Let's collaborate.</h2>
            <p>Have an idea or project in mind? Drop a message below.</p>
            
            <form action="https://formspree.io/f/xpqgayzk" method="POST">
              <div className="form-group">
                <input type="text" name="name" placeholder="Name" required />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Email Address" required />
              </div>
              <div className="form-group">
                <textarea name="message" placeholder="How can I help you?" required></textarea>
              </div>
              <button type="submit" className="btn-submit">
                Send Message <i className="ph ph-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}