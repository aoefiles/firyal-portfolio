// src/components/Contact.js
"use client";

export default function Contact() {
  const socials = [
    { name: "GitHub", url: "https://github.com/aoefiles", icon: "ph ph-github-logo" },
    { name: "LinkedIn", url: "https://linkedin.com/in/firyalaufa", icon: "ph ph-linkedin-logo" },
    { name: "Instagram", url: "https://instagram.com/firyalaufaf", icon: "ph ph-instagram-logo" },
    { name: "Medium", url: "https://medium.com/@firyalaufa23", icon: "ph ph-medium-logo" }
  ];

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      {/* Form Card */}
      <div className="card fade-in delay-1 visible" style={{ gridColumn: 'span 2' }}>
        <div className="card-header">Let's Talk <i className="ph ph-envelope"></i></div>
        <form action="https://formspree.io/f/xpqgayzk" method="POST" className="contact-form">
          <div className="form-group">
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
          </div>
          <textarea name="message" placeholder="Your Message" rows="4" required></textarea>
          <button type="submit" className="btn-submit">
            Send Message <i className="ph ph-paper-plane-tilt"></i>
          </button>
        </form>
      </div>

      {/* Socials Card */}
      <div className="card fade-in delay-2 visible">
        <div className="card-header">Socials <i className="ph ph-share-network"></i></div>
        <div className="social-grid">
          {socials.map((item, index) => (
            <a key={index} href={item.url} target="_blank" rel="noreferrer" className="social-link-item">
              <i className={item.icon}></i> {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}