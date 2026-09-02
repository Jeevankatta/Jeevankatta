import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: '/' — correct for a custom domain (jeevankatta.com).
// Only change this if the site moves to a project path like /repo/.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: { outDir: 'dist' }
})
