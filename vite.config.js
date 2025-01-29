import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // This loads all env vars with the prefix: VITE_
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [react()],

    server: {
      port: 3000,
      proxy: {
        '/api': {
          // If the env variable exists, use it. Otherwise default to localhost:3001
          target: env.VITE_API_URL || 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
