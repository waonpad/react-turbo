import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

const createEnv = require('./src/constants/env/createEnv').createEnv;

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // Env Variables Validation
  createEnv({ runtimeEnv: process.env });

  return defineConfig({
    plugins: [react()],
    server: {
      port: 8080,
    },
  });
};
