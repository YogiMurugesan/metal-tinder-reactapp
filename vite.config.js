import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  // Avoid OneDrive locking Vite's default node_modules/.vite cache.
  cacheDir: '.vite',
})
