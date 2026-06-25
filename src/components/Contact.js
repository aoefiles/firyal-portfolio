'use client';

import { contactData } from '@/data/contact';

export default function Contact() {
  return (
    <>
      <section id="contact" className="py-[80px] px-5 max-w-[600px] mx-auto mb-[50px]">
        <h2 className="text-center text-[2.2rem] font-semibold mb-[50px] relative">
          Let's <i className="font-light italic text-text-muted">Collaborate</i>
        </h2>

        {/* Formulir Kontak */}
        <form 
          action="https://formspree.io/f/xpqgayzk" 
          method="POST"
          className="bg-bg-card backdrop-blur-[12px] p-[30px] rounded-[20px] border border-border-color flex flex-col gap-[20px] mb-[40px]"
        >
          <input type="text" name="name" placeholder="Name" required className="w-full p-[15px] rounded-[10px] bg-[var(--bg-input)] border border-border-color text-text-main outline-none focus:border-primary" />
          <input type="email" name="email" placeholder="Email" required className="w-full p-[15px] rounded-[10px] bg-[var(--bg-input)] border border-border-color text-text-main outline-none focus:border-primary" />
          <input type="text" name="subject" placeholder="Subject" className="w-full p-[15px] rounded-[10px] bg-[var(--bg-input)] border border-border-color text-text-main outline-none focus:border-primary" />
          <textarea name="message" placeholder="Type your message..." required className="w-full p-[15px] rounded-[10px] bg-[var(--bg-input)] border border-border-color text-text-main outline-none min-h-[120px] resize-y focus:border-primary"></textarea>
          
          <button type="submit" className="w-full py-[10px] px-[25px] rounded-[50px] text-[0.9rem] font-semibold bg-primary text-bg-dark hover:bg-text-main transition-all">
            Send Email
          </button>
        </form>

        {/* Ikon Media Sosial */}
        <div className="flex justify-center gap-[20px] mb-[30px]">
          {contactData.socials.map((social, idx) => (
            <a 
              key={idx} 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-[50px] h-[50px] bg-bg-card border border-border-color rounded-[12px] flex items-center justify-center text-[1.5rem] transition-all hover:bg-primary hover:text-bg-dark hover:scale-110"
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </div>
      </section>

      <footer className="text-center p-[30px] text-[0.85rem] text-text-muted border-t border-border-color">
        <p>&copy; {new Date().getFullYear()} Firyal Aufa F. All Right Reserved.</p>
      </footer>
    </>
  );
}