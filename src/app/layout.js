// src/app/layout.js
import './globals.css';

export const metadata = {
  title: 'Firyal - Portfolio Home',
  description: 'Development, Data Exploration, & Mobile Apps.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Font Google: Inter & Pixelify Sans */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Pixelify+Sans:wght@500;600;700&display=swap" rel="stylesheet" />
        <script src="https://unpkg.com/@phosphor-icons/web" async></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}