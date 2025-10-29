import { defineConfig } from 'vite';

export default defineConfig({
  base: '/c-hello/',
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    minify: 'terser',
    sourcemap: false
  },
  server: {
    port: 3000,
    open: true
  }
});
