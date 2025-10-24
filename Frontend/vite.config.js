import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import svgr from '@svgr/rollup';

// https://vite.dev/config/
// vite.config.js
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const allowedHosts = process.env.VITE_ALLOWED_HOSTS ? process.env.VITE_ALLOWED_HOSTS.split(',') : [];
  console.log('VITE_ALLOWED_HOSTS:', process.env.VITE_ALLOWED_HOSTS);
  console.log('allowedHosts:', allowedHosts);
  console.log(`Backend URL: ${env.VITE_PROXY_TARGET}`);

  return {
    plugins: [
      react(),
      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 1024,
        deleteOriginFile: false,
      }),
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
      }),
      svgr(),
    ],
    server: {
      host: '0.0.0.0',
      port: env.VITE_FRONTEND_BASE_PORT,
      allowedHosts: allowedHosts,
      hmr: {
        host: allowedHosts[0],
        port: env.VITE_FRONTEND_BASE_PORT
      },
      proxy: {
        '/api': {
          target: env.VITE_PROXY_TARGET
        },
      },
    },
  };
});