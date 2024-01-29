import { resolve } from 'path';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

const __dirname = new URL('.', import.meta.url).pathname;

const viteConfig = {
  base: process.env.DEPLOY_ENV === 'gh-pages' ? '/learn-lil-gui/' : '/',

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        minimal: resolve(__dirname, 'pages/minimal/index.html'),
      },
    },
  },

  plugins: [
    eslintPlugin({
      cache: false,
      failOnError: false,
    }),
  ],
};

export default defineConfig(viteConfig);
