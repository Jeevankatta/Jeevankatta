import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' — relative paths, so the site works at https://jeevankatta.github.io/Jeevankatta/
// (GitHub Pages project path) without any custom domain.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { outDir: 'dist' }
})
