import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Firyal - Personal Portfolio',
  description: 'Data Analytics, UI/UX Design, and Software Development Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={poppins.variable}>
      <head>
        {/* FontAwesome untuk ikon */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </head>
      
      <body className={`${poppins.className} antialiased light-mode`}>
        
        <div id="cursor-glow" className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-[9998] bg-[radial-gradient(circle,rgba(195,180,227,0.08)_0%,transparent_60%)] -translate-x-1/2 -translate-y-1/2"></div>
        
        {children}

        <script dangerouslySetInnerHTML={{ __html: `
          document.addEventListener('mousemove', (e) => {
            const glow = document.getElementById('cursor-glow');
            if(glow) {
              glow.style.left = e.clientX + 'px';
              glow.style.top = e.clientY + 'px';
            }
          });
        `}} />
      </body>
    </html>
  );
}