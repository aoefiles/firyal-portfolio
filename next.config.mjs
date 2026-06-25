/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mengizinkan koneksi dari network IP agar tidak terblokir
  allowedDevOrigins: ['192.168.56.1', 'localhost'],
};

export default nextConfig;